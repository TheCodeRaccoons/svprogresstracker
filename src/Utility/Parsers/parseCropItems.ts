import { CraftingRec, ShipCrops } from "@utility/JSON"
import type { achievementType, cropsShippedType, generalFormatedItemType, itemsCraftedType, maxMonoType } from "types/displayDataTypes"
import type { itemsType } from "types/savefile"
import { GetImages, ValidateKnown } from "./Utils.ts"
import { Monoculture, Polyculture } from "@media/Achievements";

let CropsAchievements = [{
        goal: 15,
        image: Monoculture,
        name: 'Monoculture',
        done: false,
        description: 'Ship 15 of each crop',
        hoverDesc: ''
    },{
        goal: 30,
        image: Polyculture,
        name: 'Polyculture',
        done: false,
        description: 'Ship 300 of one crop',
        hoverDesc: ''
    }
];


export const GetCropsAchievements = (allShipped: itemsType[]) : cropsShippedType => { 
    const poly_crops: generalFormatedItemType[] = [] 
    const mono_extras: generalFormatedItemType[] = []
    let polycultureCount = 0;
    let maxMono: maxMonoType = { name: "undefined", shipped: 0 };
    ShipCrops.forEach(cropItem => {
        const shippedCount = getShippedCount(allShipped, cropItem.id);
        const cropData = createCropData(cropItem, shippedCount);

        if (!maxMono || shippedCount > maxMono.shipped) {
            maxMono = {
                name: cropItem.name,
                shipped: shippedCount
            };
        }

        if (cropItem.isPolyCrop) {
            if (shippedCount >= 15) polycultureCount++;
            poly_crops.push(cropData);
        } else {
            mono_extras.push(cropData);
        }
    });
    
    if (CropsAchievements[0]) {
        CropsAchievements[0].done = polycultureCount === 28;
        CropsAchievements[0].hoverDesc = 
            CropsAchievements[0].done ? 
                "You have shipped at least 15 of each polyculture crop" : 
                `You have shipped ${polycultureCount} out of 28 polyculture crops at least 15 times`;
    } 
    if (CropsAchievements[1]) {
        CropsAchievements[1].done = maxMono ? maxMono?.shipped >= 300 : false;
        CropsAchievements[1].hoverDesc = 
            CropsAchievements[1].done ? 
                `You have shipped at least 300 of ${maxMono.name}` : 
                `You have shipped ${maxMono.shipped} out of 300 required for ${maxMono.name}, your most shipped crop`;
    }
    return {
        achievements: CropsAchievements,
        poly_crops,
        mono_extras 
    };
}

const getShippedCount = (allShipped: itemsType[], cropId: number): number => {
    if (!allShipped?.length) return 0;
    const shippedItem = allShipped.find(item => item.key.int === cropId || item.key.string === cropId);
    return shippedItem?.value?.int || 0;
};

const createCropData = (cropItem: any, shippedCount: number): generalFormatedItemType => ({
        name: cropItem.name,
        image: GetImages(cropItem.name),
        id: cropItem.id,
        shipped: shippedCount
});
