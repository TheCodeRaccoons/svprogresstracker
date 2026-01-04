import { ShipItems } from "@utility/JSON"
import type { achievementType, generalFormatedItemType, shippedItemsType } from "types/displayDataTypes"
import type { itemType } from "types/savefile"
import { GetImages } from "./Utils.ts"
import { FullShipment } from "@media/Achievements";

let CraftingAchievements = [{
        goal: ShipItems.shipping.length,
        image: FullShipment,
        name: 'Full Shipment',
        done: false,
        description: 'Ship all items at least once.',
        hoverDesc: ''
    }
];

export const GetShippedItems = (allShipped: itemType) : shippedItemsType => { 
    let shippedItems: generalFormatedItemType[] = []
    let totalShipped = 0;
    if(!allShipped?.item || allShipped?.item.length === 0) {
        return {
            shippedItems,
            totalShipped,
            totalItems: ShipItems.shipping.length,
            achievements: GetAchievementData(0),
        };
    }
    //Parses the shipped info
    let shipped =  allShipped.item.map( (val) => 
        {
            return {
                id: (val.key.int) ? val.key.int : val.key.string , times: val.value.int
            }})
    if(!shipped || shipped.length === 0) {
        return {
            shippedItems,
            totalShipped,
            totalItems: ShipItems.shipping.length,
            achievements: GetAchievementData(0),
        };
    }

    ShipItems.shipping.forEach(item => {
        let isShipped = shipped.find(i => i.id === item.item_id );
        if(isShipped && isShipped.times > 0) totalShipped++;
        let d = {
            name: item.item_name,
            image: GetImages(item.item_name),
            id: item.item_id,
            shipped: (shipped && shipped.length > 0 ? shipped.find(i => i.id === item.item_id )?.times || 0 : 0)
        }
        shippedItems.push(d);
    }) 
    
    return {
        shippedItems,
        totalShipped,
        totalItems: ShipItems.shipping.length,
        achievements: GetAchievementData(totalShipped),
    };
}

const GetAchievementData = (alreadyShipped: number) : achievementType[] =>  {
    let achievements = CraftingAchievements.map(ach => {
        return {
            ...ach,
            done: alreadyShipped >= ach.goal,
            hoverDesc: alreadyShipped >= ach.goal ? 
                'Achievement unlocked!' : 
                `You need to ship ${ach.goal - alreadyShipped} more unique items to unlock this achievement.`
        }
    });
    return achievements;
}