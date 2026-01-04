import { MonsterCat } from "@utility/JSON";
import type { formatedMonsterDataType, monsterDataType } from "types/displayDataTypes";
import type { itemsType } from "types/savefile";
import { getCompletedAchievements, GetImages } from "@utility/Parsers/Utils";
import { DangerInTheDeep, InfinitePower, ProtectorOfTheValley, TheBottom } from "@media/Achievements";

let MonsterAchievements = [{
        id: 31,
        goal: 0,
        image: TheBottom,
        name: 'The Bottom',
        done: false,
        description: 'Reach the lowest level of the mines.',
        hoverDesc: ''
    },{
        id: 41,
        goal: 0,
        image: DangerInTheDeep ,
        name: 'Danger In The Deep',
        done: false,
        description: 'Reach the bottom of the "dangerous" mines.',
        hoverDesc: ''
    },{
        id: 38,
        goal: 0,
        image: ProtectorOfTheValley,
        name: 'Protector Of The Valley',
        done: false,
        description: 'Complete all of the Adventure Guild Monster Slayer goals.',
        hoverDesc: ''
    },{
        id: 42,
        goal: 0,
        image: InfinitePower,
        name: 'Infinite Powe',
        done: false,
        description: 'Obtain the most powerful weapon (Infinity Blade).',
        hoverDesc: ''
    }
];

export const GetMonsterQuests = (
    allMonsters: itemsType[],
    achievements?: number[]
): monsterDataType => {
    if(!allMonsters || allMonsters.length === 0) return { monsterData: [], achievements: [] };
    let mData: formatedMonsterDataType[] = [];
    let sum = 0;
    MonsterCat.monsters.forEach(category => {
        sum = 0;
        category.monsters.forEach(_category => {
            let monster = allMonsters.find(m => m.key.string === _category);
            sum += monster ? monster.value.int : 0
        })
        mData.push({
            category: category.name,
            goal: category.goal,
            timesKilled:  sum,
            images: category.monsters.map(m => {
                let d = {name: m, img: GetImages(m)}
                return d
            })
        })
    })

    let achievementsCompleted = MonsterAchievements.map((a) => {
        let done = getCompletedAchievements(achievements || [], a.id);
        return {
            ...a,
            done: done
        }
    });

    return { monsterData: mData, achievements: achievementsCompleted};
}