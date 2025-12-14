import type { itemsType } from "types/savefile";
import { Fishes } from "../JSON";
import { GetImages } from "./Utils";
import type { achievementType, generalFormatedItemType } from "types/displayDataTypes";
import { Fisherman, OlMariner, MasterAngler } from '@media/Achievements';

let CookingAchievements = [{
        goal: 10,
        image: Fisherman,
        name: 'Fisherman',
        done: false,
        description: 'Catch a total of 10 unique fishes',
        hoverDesc: ''
    },{
        goal: 24,
        image: OlMariner,
        name: 'Ol\' Mariner',
        done: false,
        description: 'Catch a total of 24 unique fishes',
        hoverDesc: ''
    },{
        goal: Fishes.length,
        image: MasterAngler,
        name: 'Master Angler',
        done: false,
        description: 'Catch All fishes',
        hoverDesc: ''
    }
];

export const GetFishes = (allFished: itemsType[]) => { 
    const totalFishes = Fishes.length;
    let data: generalFormatedItemType[] = []
    let fishCaught = 0;

    Fishes.forEach(item => {
        let caught = (Array.isArray(allFished)) ? (allFished.find(i => i.key.int === item.id ) !== undefined) : false
        if(caught) fishCaught++;
        let d = {
            name: item.name,
            image: GetImages(item.name),
            id: item.id,
            fished: caught
        }
        data.push(d)
    }) 
    
    return  {
        catchedFish: data,
        fishCaught,
        total: totalFishes,
        achievements: GetAchievementData(fishCaught)
    }
}

const GetAchievementData = (alreadyCooked: number) : achievementType[] =>  {
    let achievements = CookingAchievements.map(ach => {
        return {
            ...ach,
            done: alreadyCooked >= ach.goal,
            hoverDesc: alreadyCooked >= ach.goal ? 
                'Achievement unlocked!' : 
                `You need to catch ${ach.goal - alreadyCooked} more fishes to unlock this achievement.`
        }
    });
    return achievements;
}
