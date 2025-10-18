export type formattedSaveFileType = {
    farmName?: string;
    playerData: fullPlayerDataType;
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
    mineralsFound: itemFoundType[];
    cookedItems: generalFormatedItemType[];
    museumCollection: museumCollectionType;
    availableSpecialRequests: string[];
    fishCaught: generalFormatedItemType[];
    friendship: formatedFriendshipDataType[];
    itemsCrafted: generalFormatedItemType[];
    monstersKilled: formatedMonsterDataType[];
    questsDone: number;
    specialRequests: string[];
    tailoredItems: string[];
};

export type generalFormatedItemType = {
    id?: number;
    image: string;
    name: string;
    link?: string;
    knownDish?: boolean;
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
    artifacts: generalFormatedItemType[];
    minerals: generalFormatedItemType[];
}

export type cropsShippedType = {
    hasMonoculture: boolean;
    hasPolyculture: boolean;
    mono_extras: generalFormatedItemType[];
    poly_crops: generalFormatedItemType[];
    maxMono: null | maxMonoType;
};

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