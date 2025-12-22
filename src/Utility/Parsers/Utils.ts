import type { itemsType } from "types/savefile"

export const ValidateKnown = (k:itemsType[], name: string) => {
    if(Array.isArray(k)){
        let known = k.find(item => item.key.string === name) 
        return known ? true : false
    }
}

export const GetImages = (name: string): string => {
    const imageMap: { [key: string]: string } = {
        "Wild Seeds (Sp)": "Spring_Seeds",
        "Wild Seeds (Su)": "Summer_Seeds",
        "Wild Seeds (Fa)": "Fall_Seeds",
        "Wild Seeds (Wi)": "Winter_Seeds",
        "Transmute (Fe)": "Iron_Bar",
        "Transmute (Au)": "Gold_Bar",
        "Oil Of Garlic": "Oil_of_Garlic",
        "Egg (brown)": "Brown_Egg",
        "Egg (white)": "Egg",
        "Large Egg (white)": "Large_Egg",
        "Large Egg (brown)": "Large_Brown_Egg",
        "L. Goat Milk": "Large_Goat_Milk"
    };
    if (imageMap[name]) {
        return imageMap[name];
    } else {
        return name.split(" ").join("_").replace(/['":]/g, "");
    }
}

export const getCompletedAchievements = (achievements: number[], achievementId: number) => {
    return achievements.includes(achievementId);
}