import { MasteryKeys } from "@utility/JSON"
import type { skillMasteryType } from "types/displayDataTypes"
import type { itemsType } from "types/savefile"

export const GetMasteryData = (
    stats: itemsType[]
): skillMasteryType[] => {
    if(!stats || stats.length === 0) return [];
    let masteryData: any[] = [] 
    MasteryKeys.forEach((mk, id) => {
        let stat = stats.find((s) => s.key.string === mk ?  s : null);
        if(stat && stat.value){
            masteryData.push({
                mastery: mk,
                achieved: stat.value.unsignedInt || 0
            });
        }         
    })
    return masteryData;
}
