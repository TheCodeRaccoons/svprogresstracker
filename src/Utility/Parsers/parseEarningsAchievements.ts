import type { achievementType, moneyEarnedType } from "types/displayDataTypes"
import { Cowpoke, Greenhorn, Homesteader, Legend, Millionaire } from "@media/Achievements";

let CraftingAchievements = [{
        goal: 15000,
        image: Greenhorn,
        name: 'Greenhorn',
        done: false,
        description: 'Earn $15,000.',
        hoverDesc: ''
    },{
        goal: 50000,
        image: Cowpoke,
        name: 'Cowpoke',
        done: false,
        description: 'Earn $50,000.',
        hoverDesc: ''
    },{
        goal: 250000,
        image: Homesteader,
        name: 'Homesteader',
        done: false,
        description: 'Earn $250,000.',
        hoverDesc: ''
    },{
        goal: 1000000,
        image: Millionaire,
        name: 'Millionaire',
        done: false,
        description: 'Earn $1,000,000.',
        hoverDesc: ''
    },{
        goal: 10000000,
        image: Legend,
        name: 'Legend',
        done: false,
        description: 'Earn $10,000,000.',
        hoverDesc: ''
    }
];

export const getEarningAchievements = (moneyEarned: number) : moneyEarnedType => { 
    let achievements = CraftingAchievements.map(ach => {
        return {
            ...ach,
            done: moneyEarned >= ach.goal,
            hoverDesc: moneyEarned >= ach.goal ? 
                'Achievement unlocked!' : 
                `You need to earn $${ach.goal - moneyEarned} more to unlock this achievement.`
        }
    });
    return {
        totalEarned: moneyEarned,
        achievements
    };
}
