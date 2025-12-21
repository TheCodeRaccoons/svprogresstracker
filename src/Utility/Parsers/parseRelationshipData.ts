import { Friendship } from "@utility/JSON"
import type { achievementType, formatedFriendshipDataType, friendshipType } from "types/displayDataTypes"
import type { friendshipDataType } from "types/savefile"
import { NewFriend, BestFriends, TheBelovedFarmer, Cliques, Networking, Popular } from "@media/Achievements";

type friendshipAchievementDataType = {
    goal: number;
    people: number;
    image: string;
    name: string;
    done: boolean;
    description: string;
    hoverDesc: string;
}

let FriendshipAchievements = [{
        goal: 5,
        people: 1,
        image: NewFriend,
        name: 'A New Friend.',
        done: false,
        description: 'Reach a 5-heart friend level with someone.',
        hoverDesc: ''
    },{
        goal: 10,
        people: 1,
        image: BestFriends ,
        name: 'Best Friends ',
        done: false,
        description: 'Reach a 10-heart friend level with someone.',
        hoverDesc: ''
    },{
        goal: 10,
        people: 8,
        image: TheBelovedFarmer,
        name: 'The Beloved Farmer',
        done: false,
        description: 'Reach a 10-heart friend level with 8 people.',
        hoverDesc: ''
    },{
        goal: 5,
        people: 4,
        image: Cliques,
        name: 'Cliques',
        done: false,
        description: 'Reach a 5-heart friend level with 4 people.',
        hoverDesc: ''
    },{
        goal: 5,
        people: 10,
        image: Networking,
        name: 'Networking',
        done: false,
        description: 'Reach a 5-heart friend level with 10 people.',
        hoverDesc: ''
    },{
        goal: 5,
        people: 20,
        image: Popular,
        name: 'Popular',
        done: false,
        description: 'Reach a 5-heart friend level with 20 people.',
        hoverDesc: ''
    }
];

export const GetFriendshipData = (allFriends: friendshipDataType[]): friendshipType => { 
    let data: formatedFriendshipDataType[] = []
    if(Array.isArray(allFriends)){
        allFriends.forEach(i => {
            if(Friendship.includes(i.key.string)){
                let level = Math.trunc(i.value.Friendship.Points / 250)
                let d = {
                    name: i.key.string, 
                    dateable: GetDateableNPC(i.key.string),
                    points: i.value.Friendship.Points,
                    level: level,
                    lvlup: 250 - (i.value.Friendship.Points - (level * 250))
                } 
                data.push(d); 
            } 
        })
    }

    const achievements = GetAchievementData(data);

    return {
        friendship: data,
        achievements: achievements
    }
}


const GetDateableNPC = (name: string): boolean => {
    const dateableNPCs = new Set([
        "Abigail", "Alex", "Elliott", "Emily", "Haley", "Harvey",
        "Leah", "Maru", "Penny", "Sam", "Sebastian", "Shane"
    ]);
    
    return dateableNPCs.has(name);
}


const GetAchievementData = (friendships: formatedFriendshipDataType[]) : achievementType[] =>  {
    let achievements = FriendshipAchievements.map(ach => {
        let {done, totalPeople} = validateAchievementDone(ach, friendships);
        return {
            ...ach,
            done: done,
            hoverDesc: done ? 
                'Achievement unlocked!' : 
                `You need friendship level ${ach.goal} with ${ach.people - totalPeople} more people to unlock this achievement.`
        }
    });

    return achievements;
}

const validateAchievementDone = (
    ach: friendshipAchievementDataType, 
    friendships: formatedFriendshipDataType[]
): {done: boolean, totalPeople: number} => {
    let totalPeople = 0;
    for (let friend of friendships) {
        if (totalPeople >= ach.people) {
            return { done: true, totalPeople };
        }
        if (friend.level >= ach.goal) {
            totalPeople++;
        }
    }
    return { done: totalPeople >= ach.people, totalPeople } ;
}