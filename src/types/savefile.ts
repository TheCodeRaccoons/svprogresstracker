export type saveGameType = {
    SaveGame: saveFileType,
}

export type saveFileType = {
    player: playerType,
    locations: locationsType,
    currentSeason: string,
    samBandName: string,
    elliottBookName: string,
    broadcastedMail: string,
    lostBooksFound: number,
    goldenWalnuts: number,
    goldenWalnutsFound: number,
    miniShippingBinsObtained: number,
    mineShrineActivated: boolean,
    goldenCoconutCracked: boolean,
    parrotPlatformsUnlocked: boolean,
    farmPerfect: boolean,
    foundBuriedNuts: string,
    visitsUntilY1Guarantee: number,
    shuffleMineChests: string,
    dayOfMonth: number,
    year: number,
    farmerWallpaper: number,
    FarmerFloor: number,
    currentWallpaper: number,
    currentFloor: number,
    currentSongIndex: number,
    chanceToRainTomorrow: number,
    dailyLuck: number,
    uniqueIDForThisGame: number,
    weddingToday: boolean,
    isRaining: boolean,
    isDebrisWeather: boolean,
    shippingTax: boolean,
    isLightning: boolean,
    isSnowing: boolean,
    shouldSpawnMonsters: boolean,
    hasApplied1_3_UpdateChanges: boolean,
    hasApplied1_4_UpdateChanges: boolean,
    musicVolume: number,
    soundVolume: number,
    highestPlayerLimit: number,
    moveBuildingPermissionMode: number,
    splitscreenOptions: string,
    CustomData: string,
    mine_permanentMineChanges: minePermanentChanges,
    mine_lowestLevelReached: number,
    minecartHighScore: number,
    weatherForTomorrow: number,
    whichFarm: number,
    mine_lowestLevelReachedForOrder: number,
    skullCavesDifficulty: number,
    minesDifficulty: number,
    currentGemBirdIndex: number,
    lastAppliedSaveFix: number,
    gameVersion: string,
    gameVersionLabel: string,
    completedSpecialOrders: specialOrderType,
    availableSpecialOrders: specialOrderType,
}

export type specialOrderType = {
    SpecialOrder: questType[]
}

type minePermanentChanges = {

}

type locationsType = {
    GameLocation: gameLocationType[]
}

export type gameLocationType = {
    isFarm: boolean,
    name: string,
    isOutdoors: boolean,
    isStructure: boolean,
    ignoreDebrisWeather: boolean,
    ignoreOutdoorLighting: boolean,
    ignoreLights: boolean,
    treatAsOutdoors: boolean,
    numberOfSpawnedObjectsOnMap: number,
    miniJukeboxCount: number,
    miniJukeboxTrack: string,
    furniture: string,
    IsGreenhouse: boolean,
    animals: string,
    piecesOfHay: number,
    grandpaScore: number,
    farmCaveReady: boolean,
    hasSeenGrandpaNote: boolean,
    buildings: {
        Building: buildingType[]
    },
    museumPieces: {item: itemsType[]},
}

type buildingType = {
    characters: string,
    objects: string,
    resourceClumps: string,
    largeTerrainFeatures: string,
    terrainFeatures: string,
    uniqueName: string,
    name: string,
    indoors: buildingIndoorsType,
}

type buildingIndoorsType = {
    farmhand: playerType | null,
}

export type playerType = {
    name: string,
    forceOneTileWide: boolean,
    isEmoting: boolean,
    isCharging: boolean,
    isGlowing: boolean,
    coloredBorder: boolean,
    flip: boolean,
    drawOnTop: boolean,
    faceTowardFarmer: boolean,
    ignoreMovementAnimation: boolean,
    faceAwayFromFarmer: boolean,
    speed: number,
    FacingDirection: number,
    IsEmoting: boolean,
    CurrentEmote: number,
    Scale: number,
    professions: intArrayType,
    newLevels: string,
    dialogueQuestionsAnswered: string,
    furnitureOwned: string,
    activeDialogueEvents: string,
    secretNotesSeen: string,
    achievements: string,
    specialBigCraftables: string,
    mailForTomorrow: string,
    mailbox: string,
    blueprints: string,
    biteChime: number,
    itemsLostLastDeath: string,
    movementDirections: string,
    farmName: string,
    favoriteThing: string,
    slotCanHost: boolean,
    userID: string,
    catPerson: boolean,
    whichPetBreed: number,
    acceptedDailyQuest: boolean,
    shirt: number,
    hair: number,
    skin: number,
    shoes: number,
    accessory: number,
    facialHair: number,
    pants: number,
    divorceTonight: boolean,
    changeWalletTypeTonight: boolean,
    woodPieces: number,
    stonePieces: number,
    copperPieces: number,
    ironPieces: number,
    coalPieces: number,
    goldPieces: number,
    iridiumPieces: number,
    quartzPieces: number,
    gameVersion: string,
    gameVersionLabel: string,
    caveChoice: number,
    feed: number,
    farmingLevel: number,
    miningLevel: number,
    combatLevel: number,
    foragingLevel: number,
    fishingLevel: number,
    luckLevel: number,
    newSkillPointsToSpend: number,
    addedFarmingLevel: number,
    addedMiningLevel: number,
    addedCombatLevel: number,
    addedForagingLevel: number,
    addedFishingLevel: number,
    addedLuckLevel: number,
    maxStamina: number,
    maxItems: number,
    lastSeenMovieWeek: number,
    resilience: number,
    attack: number,
    immunity: number,
    attackIncreaseModifier: number,
    knockbackModifier: number,
    weaponSpeedModifier: number,
    critChanceModifier: number,
    critPowerModifier: number,
    weaponPrecisionModifier: number,
    clubCoins: number,
    trashCanLevel: number,
    daysLeftForToolUpgrade: number,
    houseUpgradeLevel: number,
    daysUntilHouseUpgrade: number,
    coopUpgradeLevel: number,
    barnUpgradeLevel: number,
    hasGreenhouse: boolean,
    hasUnlockedSkullDoor: boolean,
    hasDarkTalisman: boolean,
    hasMagicInk: boolean,
    showChestColorPicker: boolean,
    hasMagnifyingGlass: boolean,
    hasWateringCanEnchantment: boolean,
    magneticRadius: number,
    temporaryInvincibilityTimer: number,
    currentTemporaryInvincibilityDuration: number,
    health: number,
    maxHealth: number,
    difficultyModifier: number,
    isMale: boolean,
    hasBusTicket: boolean,
    stardewHero: boolean,
    hasClubCard: boolean,
    hasSpecialCharm: boolean,
    recipesCooked: recipesCookedType[],
    callsReceived: string,
    tailoredItems: itemType,
    dayOfMonthForSaveGame: number,
    seasonForSaveGame: number,
    yearForSaveGame: number,
    overallsColor: number,
    shirtColor: number,
    skinColor: number,
    hairColor: number,
    eyeColor: number,
    bobber: string,
    qiGems: number,
    hasUsedDailyRevive: boolean,
    saveTime: number,
    isCustomized: boolean,
    homeLocation: string,
    lastSleepLocation: string,
    daysMarried: number,
    movementMultiplier: number,
    theaterBuildDate: number,
    deepestMineLevel: number,
    stamina: number,
    totalMoneyEarned: number,
    millisecondsPlayed: number,
    hasRustyKey: boolean,
    hasSkullKey: boolean,
    canUnderstandDwarves: boolean,
    HasTownKey: boolean,
    useSeparateWallets: boolean,
    timesReachedMineBottom: number,
    UniqueMultiplayerID: string,
    money: number,
    cookingRecipes: itemType,
    craftingRecipes: itemType,
    stats: statsType,
    basicShipped: itemType,
    mineralsFound: itemType,
    archaeologyFound: itemType,
    friendshipData: friendshipDataItemType
    experiencePoints: intArrayType,
    fishCaught: itemType,
}

export type recipesCookedType = {
    id: number;
    image: string;
    link: string;
    name: string;
};

type intArrayType = {
    int: number[]
}

type friendshipDataItemType = {
    item: friendshipDataType[]
}

type friendshipDataType = {
    key: {
        string: "Robin"
    },
    value: {
        Friendship: {
            Points: number,
            GiftsThisWeek: number,
            GiftsToday: number,
            TalkedToToday: boolean,
            ProposalRejected: boolean,
            Status: string,
            Proposer: number,
            RoommateMarriage: boolean
        }
    }
}

export type itemType = {
    item: itemsType[]
}

export type itemsType = {
    key: {
            int?: number
            string?: string
        },
    value: {
        int: number,
        ArrayOfInt?: {
            int: number[]
        }
    }
}

type statsType = {
    seedsSown: number,
    itemsShipped: number,
    itemsCooked: number,
    itemsCrafted: number,
    chickenEggsLayed: number,
    duckEggsLayed: number,
    cowMilkProduced: number,
    goatMilkProduced: number,
    rabbitWoolProduced: number,
    sheepWoolProduced: number,
    cheeseMade: number,
    goatCheeseMade: number,
    trufflesFound: number,
    stoneGathered: number,
    rocksCrushed: number,
    dirtHoed: number,
    giftsGiven: number,
    timesUnconscious: number,
    averageBedtime: number,
    timesFished: number,
    fishCaught: number,
    bouldersCracked: number,
    stumpsChopped: number,
    stepsTaken: number,
    monstersKilled: number,
    diamondsFound: number,
    prismaticShardsFound: number,
    otherPreciousGemsFound: number,
    caveCarrotsFound: number,
    copperFound: number,
    ironFound: number,
    coalFound: number,
    coinsFound: number,
    goldFound: number,
    iridiumFound: number,
    barsSmelted: number,
    beveragesMade: number,
    preservesMade: number,
    piecesOfTrashRecycled: number,
    mysticStonesCrushed: number,
    daysPlayed: number,
    weedsEliminated: number,
    sticksChopped: number,
    notesFound: number,
    questsCompleted: number,
    starLevelCropsShipped: number,
    cropsShipped: number,
    itemsForaged: number,
    slimesKilled: number,
    geodesCracked: number,
    goodFriends: number,
    totalMoneyGifted: number,
    individualMoneyEarned: number,
    GoodFriends: number,
    CropsShipped: number,
    ItemsForaged: number,
    GeodesCracked: number,
    SlimesKilled: number,
    StarLevelCropsShipped: number,
    StoneGathered: number,
    QuestsCompleted: number,
    FishCaught: number,
    NotesFound: number,
    SticksChopped: number,
    WeedsEliminated: number,
    DaysPlayed: number,
    BouldersCracked: number,
    MysticStonesCrushed: number,
    GoatCheeseMade: number,
    CheeseMade: number,
    PiecesOfTrashRecycled: number,
    PreservesMade: number,
    BeveragesMade: number,
    BarsSmelted: number,
    IridiumFound: number,
    GoldFound: number,
    CoinsFound: number,
    CoalFound: number,
    IronFound: number,
    CopperFound: number,
    CaveCarrotsFound: number,
    OtherPreciousGemsFound: number,
    PrismaticShardsFound: number,
    DiamondsFound: number,
    MonstersKilled: number,
    StepsTaken: number,
    StumpsChopped: number,
    TimesFished: number,
    AverageBedtime: number,
    TimesUnconscious: number,
    GiftsGiven: number,
    DirtHoed: number,
    RocksCrushed: number,
    TrufflesFound: number,
    SheepWoolProduced: number,
    RabbitWoolProduced: number,
    GoatMilkProduced: number,
    CowMilkProduced: number,
    DuckEggsLayed: number,
    ItemsCrafted: number,
    ChickenEggsLayed: number,
    ItemsCooked: number,
    ItemsShipped: number,
    SeedsSown: number,
    IndividualMoneyEarned: number,
    specificMonstersKilled: specificMonstersKilledType
}

type specificMonstersKilledType = {
    item: itemType
}

// Leaf types
type tileLocationType = {
    X: number;
    Y: number;
}

type donateObjectiveType = {
    currentCount: number;
    maxCount: number;
    description: string;
    failOnCompletion: boolean;
    dropBox: string;
    dropBoxGameLocation: string;
    dropBoxTileLocation: tileLocationType;
    acceptableContextTagSets: string;
    minimumCapacity: number;
    confirmed: boolean;
    "@_xsi:type": string;
}

type gemsRewardType = {
    amount: { int: number };
    "@_xsi:type": string;
}

export type questType = {
    preSelectedItems: string;
    selectedRandomElements: string;
    objectives: donateObjectiveType;
    generationSeed: number;
    seenParticipantsIDs: string;
    participantsIDs: string;
    unclaimedRewardsIDs: string;
    appliedSpecialRules: boolean;
    rewards: gemsRewardType;
    questKey: string;
    questName: string;
    questDescription: string;
    requester: string;
    orderType: string; // e.g., "Qi"
    specialRule: string;
    readyForRemoval: boolean;
    itemToRemoveOnEnd: number;
    dueDate: number;
    duration: string;
    questState: string;
}

export type shippedItemType = {
    name: string;
    image: string;
    id: number;
    shipped: number;
}

export type cropsShippedType = {
    mono_extras: shippedItemType[];
    poly_crops: shippedItemType[];
};

export type experienceType = {
    levelInfo: {
        id: number;
        val: number;
    };
    skill: string;
    xp: number;
};