export type formattedSaveFileType = {
    farmName?: string;
    playerData: fullPlayerDataType | null;
    farmhandData: fullPlayerDataType[];
}

export type fullPlayerDataType = {
    playerName: string;
    farmName: string;
    experience: experienceType[];
    moneyEarned: number;
    professions: professionsType[];
    shippedItems: generalFormatedItemType[];
    cropsShipped: cropsShippedType;
    mineralsFound?: itemFoundType[];
    cookingData: cookingDataType;
    museumCollection: museumCollectionType;
    availableSpecialRequests: string[];
    fishCaught: fishCaughtType;
    friendship: formatedFriendshipDataType[];
    itemsCrafted: itemsCraftedType;
    monstersKilled: formatedMonsterDataType[];
    questsDone: number;
    specialRequests: string[];
    tailoredItems: string[];
};

export type itemsCraftedType = {
    knownItems: number;
    alreadyCraftedItems: number;
    craftedItems: generalFormatedItemType[];
    totalRecipes: number;
    achievements?: achievementType[];
}

export type cookingDataType = {
    knownRecipes: number;
    alreadyCookedRecipes: number;
    cookedItems: generalFormatedItemType[];
    totalRecipes: number;
    achievements?: achievementType[];
}

export type cropsShippedType = {
    achievements?: achievementType[];
    mono_extras: generalFormatedItemType[];
    poly_crops: generalFormatedItemType[];
};

export type fishCaughtType = {
    fishCaught: number;
    catchedFish: generalFormatedItemType[];
    total: number;
    achievements?: achievementType[];
}

export type achievementType = {
        done: boolean,
        goal: number,
        image: string,
        name: string,
        description: string,
        hoverDesc: string,
}

export type generalFormatedItemType = {
    id?: number | string;
    image: string;
    name: string;
    link?: string;
    knownDish?: boolean;
    known?: boolean;
    times?: number;
    shipped?: number;
    fished?: boolean;
    found?: boolean;
    inMuseum?: boolean;
}

export type professionsType = {
    id: number;
    name: string;
}

export type museumCollectionType = {
    totalFound?: number;
    totalDelivered?: number;
    total?: number;
    missingItemsText?: string | undefined;
    artifacts: generalFormatedItemType[];
    minerals: generalFormatedItemType[];
}

export type maxMonoType = {
    name: string;
    shipped: number;
}

export type itemFoundType = {
    item: number | string,
    timesFound: number
}

export type experienceType = {
    levelInfo: {
        id: number;
        val: number;
    };
    skill: string;
    xp: number;
};

export type formatedFriendshipDataType = {
    name: string;
    dateable: boolean;
    points: number;
    level: number;
    lvlup: number;
}

export type formatedMonsterDataType = {
    category: string;
    goal: number;
    images: monsterImageType[];
    timesKilled: number;
};

type monsterImageType = {
    img: string;
    name: string;
}