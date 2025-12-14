import { CraftingRec } from "@utility/JSON"
import type { achievementType, generalFormatedItemType, itemsCraftedType } from "types/displayDataTypes"
import type { itemsType } from "types/savefile"
import { GetImages, ValidateKnown } from "./Utils.ts"
import { DIY, Artisan, MasterCraft } from "@media/Achievements";

let CraftingAchievements = [{
        goal: 15,
        image: DIY,
        name: 'D.I.Y.',
        done: false,
        description: 'Craft a total of 15 items',
        hoverDesc: ''
    },{
        goal: 30,
        image: Artisan ,
        name: 'Artisan ',
        done: false,
        description: 'Craft a total of 30 items',
        hoverDesc: ''
    },{
        goal: CraftingRec.recipes.length,
        image: MasterCraft,
        name: 'Craft Master',
        done: false,
        description: 'Craft All items',
        hoverDesc: ''
    }
];

export const GetCraftingRecipes = (recipes: itemsType[]): itemsCraftedType => {
    let data: generalFormatedItemType[] = []
    let totalCrafted = 0;
    let totalKnown = 0;
    if(Array.isArray(recipes)) {
        CraftingRec.recipes.forEach(item => {
            let timesCrafted = recipes.find(i => i.key.string === item)?.value.int || 0;
            let known = ValidateKnown(recipes, item) || false;
            if(known) totalKnown++;
            if(timesCrafted > 0) totalCrafted++;
            let d = {
                name: item,
                image: GetImages(item),
                times: timesCrafted,
                known: known
            }
            data.push(d)
        })
    }
    return {
        knownItems: totalKnown,
        alreadyCraftedItems: totalCrafted,
        craftedItems: [...data],
        totalRecipes: CraftingRec.recipes.length,
        achievements: GetAchievementData(totalCrafted),
    }; 
}

const GetAchievementData = (alreadyCrafted: number) : achievementType[] =>  {
    let achievements = CraftingAchievements.map(ach => {
        return {
            ...ach,
            done: alreadyCrafted >= ach.goal,
            hoverDesc: alreadyCrafted >= ach.goal ? 
                'Achievement unlocked!' : 
                `You need to craft ${ach.goal - alreadyCrafted} more items to unlock this achievement.`
        }
    });
    return achievements;
}