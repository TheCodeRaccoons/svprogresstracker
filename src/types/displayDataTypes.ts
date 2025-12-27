export type formattedSaveFileType = {
    farmName?: string;
    playerData: fullPlayerDataType | null;
    farmhandData: fullPlayerDataType[];
}

export type fullPlayerDataType = {
    playerName: string;
    farmName: string;
    experience: experienceType[];
    moneyEarned: moneyEarnedType;
    professions: professionsType[];
    shippedItems: shippedItemsType;
    cropsShipped: cropsShippedType;
    mineralsFound?: itemFoundType[];
    cookingData: cookingDataType;
    museumCollection: museumCollectionType;
    availableSpecialRequests: string[];
    fishCaught: fishCaughtType;
    friendship: friendshipType;
    itemsCrafted: itemsCraftedType;
    monstersKilled: monsterDataType;
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

export type monsterDataType = {
    monsterData: formatedMonsterDataType[];
    achievements?: achievementType[];
}

export type friendshipType = {
    friendship: formatedFriendshipDataType[];
    achievements?: achievementType[];
}

export type shippedItemsType = {
    shippedItems: generalFormatedItemType[];
    totalShipped: number;
    totalItems: number;
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

export type moneyEarnedType = {
    totalEarned: number;
    achievements: achievementType[];
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
    artifacts: generalFormatedItemType[];
    minerals: generalFormatedItemType[];
    achievements?: achievementType[];
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