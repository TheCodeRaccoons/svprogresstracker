/* eslint-disable no-loop-func */

import Dishes from './Dishes.json' with { type: "json" };
import CraftingRec from '@utility/CraftingRecipes.json' with { type: "json" };
import ProfNames from '@utility/professions.json' with { type: "json" };
import Levels from '@utility/levels.json' with { type: "json" };
import ShipItems from '@utility/shippingItems.json' with { type: "json" };
import ShipCrops from '@utility/shippingCrops.json' with { type: "json" };
import Fishes from '@utility/fishes.json' with { type: "json" };
import Friendship from '@utility/friendship.json' with { type: "json" };
import MonsterCat from '@utility/monsterCategorie.json' with { type: "json" };
import Museum from '@utility/museum.json' with { type: "json" };
import townSR from './TownSpecialReq.json' with { type: "json" };
import QiSR from './QiSpecialReq.json' with { type: "json" };
import type {
    friendshipDataType, 
    gameLocationType,
    itemsType, 
    itemType,
    playerType,
    questType, 
    specialOrderType 
} from 'types/savefile';
import type { 
    cropsShippedType, 
    generalFormatedItemType, 
    professionsType, 
    maxMonoType, 
    itemFoundType, 
    experienceType, 
    formatedFriendshipDataType,
    formatedMonsterDataType,
    cookingDataType
} from 'types/displayDataTypes';
import type { fullPlayerDataType, museumCollectionType } from 'types/displayDataTypes';

//Gets the info from the farm hands as an array of the same type
const GetFarmHands = (locations: gameLocationType[]): playerType[] => {
    if (!Array.isArray(locations)) return [];
    let players: playerType[] = []
    let farmBuildings = locations.filter(loc => loc.isFarm === true);

    if(farmBuildings && farmBuildings.length > 0){
        farmBuildings.forEach(building => {
            let locationBuildings = (Array.isArray(building.buildings?.Building)) 
                ? building.buildings.Building.filter(b => b !== undefined) 
                : (building.buildings?.Building !== undefined ? [building.buildings.Building] : []);
            locationBuildings.forEach(building => {
                if(building.indoors && building.indoors.farmhand) {
                    players.push(building.indoors.farmhand);
                }
            })
        })
    }
    else players = []
    return players;
}

type getDetailedInfoType = {
    playerData: playerType[],
    collectionStatus: itemsType[],
    specialRequests: specialOrderType ,
    availableSpecialRequests: specialOrderType
}

type getParsedUserDataType = Omit<getDetailedInfoType, 'playerData'> & {
    playerData: playerType
}

//Calls the parser and creates an array of players depending on wether it is a single player or multiple
const GetDetailedInfo = ({
        playerData , 
        collectionStatus, 
        specialRequests, 
        availableSpecialRequests
    }: getDetailedInfoType) =>{ 
    let fullPlayerData: fullPlayerDataType[] = []
    if(Array.isArray(playerData)){
        playerData.forEach(p => { 
            let playerFull: fullPlayerDataType
            = {
                //...p, 
                ...parseData({playerData: p, collectionStatus, specialRequests, availableSpecialRequests})
            }
            
            if(playerFull !== null)
            fullPlayerData.push(playerFull)
        }) 
    }
    
    return fullPlayerData;
} 
    
//Creates an object per player with the cleanup playerData.from the file
const parseData = ({
        playerData, 
        collectionStatus, 
        specialRequests, 
        availableSpecialRequests
    }: getParsedUserDataType) : fullPlayerDataType => { 
    //Not finished  
    console.log("Parsing data for:", playerData)
    let fullPlayerData : fullPlayerDataType = {
        playerName: playerData.name || "Unknown",
        farmName: playerData.farmName, //TODO: Remove and make global if even needed
        experience: GetXpInfo(playerData.experiencePoints.int), //DONE
        moneyEarned: playerData.totalMoneyEarned || 0, //DONE
        professions: GetProfessionData(playerData.professions.int) , //DONE?
        shippedItems: GetShippedItems(playerData.basicShipped) || [],//DONE
        cropsShipped: GetCropsAchievements(playerData.basicShipped?.item),//Refactored DONE
        //mineralsFound: GetArrayData(playerData.mineralsFound?.item) || [], //DONE
        cookingData: GetCookingData(playerData.recipesCooked, playerData.cookingRecipes.item) || [], //DONE
        fishCaught: GetFishes(playerData.fishCaught.item) || [], 
        tailoredItems: GetArrayDataTimeless(playerData.tailoredItems) || [],
        itemsCrafted: GetCraftingRecipes(playerData.craftingRecipes.item) || [],
        friendship: GetFriendshipData(playerData.friendshipData.item) || [],
        monstersKilled: 
            GetMonsterQuests(playerData.stats.specificMonstersKilled.item, playerData.stats.slimesKilled) || [],
        museumCollection: 
            GetMCollection(playerData.archaeologyFound.item, playerData.mineralsFound.item, collectionStatus) || {},
        questsDone: playerData.stats.questsCompleted || 0,
        specialRequests: 
            specialRequests?.SpecialOrder ?
                GetSpecialRequests(specialRequests.SpecialOrder, townSR.Requests, true) 
                : [],
        availableSpecialRequests: 
            specialRequests?.SpecialOrder ? 
                GetSpecialRequests(specialRequests.SpecialOrder, townSR.Requests, false) 
                : []
    }

    console.log(`%c Grandpa's eval for ${playerData.name}`, 'color: #7289DA') 
    console.log("Player Data", fullPlayerData)
    return fullPlayerData;
} 

/* XP Data */
const GetXpInfo = (xp: number[]): experienceType[] => {
    const SKILLS = ["Farming", "Fishing", "Foraging", "Mining", "Combat"]

    let skillLevelData: experienceType[] = [] 
    xp.forEach((_skill, id) => {
        if (SKILLS[id] !== undefined){
            skillLevelData.push({
                skill:  SKILLS[id] || "Unknown",
                xp: _skill,
                levelInfo: Levels.find((level) => level.val >= _skill) || { id: 10, val: 15000 }
            })
        }
    })
    return skillLevelData
}
/* End of XP Data */
/* Profession Data */

const GetProfessionData = (professions: number[]): professionsType[] =>{
    let data: professionsType[] = []; 
    if(Array.isArray(professions)){ 
        professions.forEach(item => {
            let d = ProfNames.professions.find( p  => p.id === item)
            if (d !== undefined) {
                data = [...data, d]
            }
        });
    }
    console.log('Profession Data:', data);
    return data;
}

//TODO: generate json file for professions and implement in the profession tab
const GetProfession = (id: number): string => {
    const professionMap: { [key: number]: string } = {
        0: "Rancher",
        1: "Tiller",
        2: "Coopmaster",
        3: "Shepherd",
        4: "Artisan",
        5: "Agriculturist",
        6: "Fisher",
        7: "Trapper",
        8: "Angler",
        9: "Pirate",
        10: "Mariner",
        11: "Luremaster",
        12: "Forester",
        13: "Gatherer",
        14: "Lumberjack",
        15: "Tapper",
        16: "Botanist",
        17: "Tracker",
        18: "Miner",
        19: "Geologist",
        20: "Blacksmith",
        21: "Prospector",
        22: "Excavator",
        23: "Gemologist",
        24: "Fighter",
        25: "Scout",
        26: "Brute",
        27: "Defender",
        28: "Acrobat",
        29: "Desperado"
    };
    
    return professionMap[id] || "";
}
/* End of Profession Data */

/* Shipping Related Achievements */
const GetShippedItems = (allShipped: itemType) :generalFormatedItemType[] => { 
    let data: generalFormatedItemType[] = []
    if(!allShipped?.item || allShipped?.item.length === 0) return data;
    //Parses the shipped info
    let shipped =  allShipped.item.map( val => {return {id: val.key.int, times: val.value.int}})

    ShipItems.shipping.forEach(item => {
        let d = {
            name: item.item_name,
            image: GetImages(item.item_name),
            id: item.item_id,
            shipped: (shipped && shipped.length > 0 ? shipped.find(i => i.id === item.item_id )?.times || 0 : 0)
        }
        data.push(d);
    }) 
    return data;
}
/* End of Shipping Related Achievements */

const GetCookingData = (cooked: itemType, known: itemsType[]): cookingDataType =>{
    let data: generalFormatedItemType[] = [];
    let knownRecipes = 0;
    let alreadyCooked = 0;
    Dishes.Dishes.forEach(item => {
        let knownDish = ValidateKnown(known, NameTranslate(item.Name)) || false
        let cookedTimes = GetCooked(cooked.item, item.id)
        if(cookedTimes > 0) alreadyCooked++;
        if(knownDish) knownRecipes++;
        console.log('Dish:', item.Name, 'Known:', knownRecipes, 'CookedTimes:', alreadyCooked)
        let d = {
            name: NameTranslate(item.Name),
            id: item.id,
            image: GetImages(item.Name),
            link: item.link,
            knownDish: knownDish,
            times: cookedTimes
        }
        data.push(d);
    })
    return { knownRecipes, alreadyCookedRecipes: alreadyCooked, cookedItems: data };
}

const GetCooked = (cookedItems:itemsType[], id: number): number => { 
    let timesCooked = 0; 
    if(Array.isArray(cookedItems)){
        let i = cookedItems.find(item => {
            if (item.key?.int === undefined){
                if (item.key?.string !== undefined){
                    return +item.key.string === id;
                } else{
                    return false;
                }
            } else {
                return item.key.int === id
            }
        }) 
        timesCooked = (i !== undefined) ? i.value.int : 0  
    }
    return timesCooked;
}

const GetCraftingRecipes = (recipes: itemsType[]): generalFormatedItemType[] => {
    let data: generalFormatedItemType[] = []  
    if(Array.isArray(recipes)) {
        CraftingRec.recipes.forEach(item => {
            let d = {
                name: item,
                image: GetImages(item),
                times: recipes.find(i => i.key.string === item)?.value.int || 0,
            }
            data.push(d)
        })
    } 
    return data 
}

/* Crop Related Achievements */
const GetCropsAchievements = (allShipped: itemsType[]) : cropsShippedType => { 
    const poly_crops: generalFormatedItemType[] = [] 
    const mono_extras: generalFormatedItemType[] = []
    let polycultureCount = 0;
    let maxMono: maxMonoType = { name: "undefined", shipped: 0 };

    ShipCrops.forEach(cropItem => {
        const shippedCount = getShippedCount(allShipped, cropItem.id);
        const cropData = createCropData(cropItem, shippedCount);

        if (!maxMono || shippedCount > maxMono.shipped) {
            maxMono = {
                name: cropItem.name,
                shipped: shippedCount
            };
        }

        if (cropItem.isPolyCrop) {
            if (shippedCount >= 15) polycultureCount++;
            poly_crops.push(cropData);
        } else {
            mono_extras.push(cropData);
        }
    });

    const cropsAchievements = {
        hasPolyculture: polycultureCount === 28,
        hasMonoculture: maxMono ? maxMono?.shipped >= 300 : false,
        maxMono,
        poly_crops,
        mono_extras 
    };

    return cropsAchievements;
}

const getShippedCount = (allShipped: itemsType[], cropId: number): number => {
    if (!allShipped?.length) return 0;
    const shippedItem = allShipped.find(item => item.key.int === cropId);
    return shippedItem?.value?.int || 0;
};

const createCropData = (cropItem: any, shippedCount: number): generalFormatedItemType => ({
        name: cropItem.name,
        image: GetImages(cropItem.name),
        id: cropItem.id,
        shipped: shippedCount
    });

/* End of Crop Related Achievements */

const GetFishes = (allFished: itemsType[]) => { 
    let data: generalFormatedItemType[] = []

    Fishes.forEach(item => {
        let d = {
            name: item.name,
            image: GetImages(item.name),
            id: item.id,
            fished: (Array.isArray(allFished)) ? (allFished.find(i => i.key.int === item.id ) !== undefined) : false
        }
        data.push(d)
    }) 
    
    return  data
}

const GetFriendshipData = (allFriends: friendshipDataType[]): formatedFriendshipDataType[] => { 
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
    return data
}

const GetMonsterQuests = (allMonsters: itemsType[], slimesKilled: number): formatedMonsterDataType[] => {

    if(!allMonsters || allMonsters.length === 0) return [];

        let mData: formatedMonsterDataType[] = []
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
                timesKilled: (category.name === "Slimes") ? slimesKilled : sum,
                images: category.monsters.map(m => {
                    let d = {name: m, img: GetImages(m)}
                    return d
                })
            })
        })
        return(mData) 
}
const GetMCollection = 
    (archeology: itemsType[], geology: itemsType[], currentCollection: itemsType[]) : museumCollectionType => {

    if(currentCollection === undefined || currentCollection.length === 0) return {artifacts: [], minerals: []};

    let artifacts: generalFormatedItemType[] = [];
    let minerals: generalFormatedItemType[] = []
    let _totalFound = 0;
    let _totalDonated = 0;

    for(let collectionItem of Museum.collection) {
        let alreadyDonated = currentCollection.filter(c => c.value.int === collectionItem.id).length > 0;
        _totalDonated = alreadyDonated ? _totalDonated + 1 : _totalDonated;
        if( archeology && archeology.length > 0 && collectionItem.type === "artifact"){
            let found = archeology.filter(a => a.key.int === collectionItem.id).length > 0;
            _totalFound = found ? _totalFound + 1 : _totalFound;

            artifacts.push({
                name: collectionItem.name,
                image: GetImages(collectionItem.name),
                found: found,
                inMuseum: alreadyDonated
            })
        } else if(geology && geology.length > 0 && collectionItem.type === "mineral"){
            let found = geology.filter(g => g.key.int === collectionItem.id).length > 0;
            _totalFound = found ? _totalFound + 1 : _totalFound;
            minerals.push({
                name: collectionItem.name,
                image: GetImages(collectionItem.name),
                found: found,
                inMuseum: alreadyDonated
            })
        }
    }


    let missingItemsText = (Museum.collection.length - _totalDonated > 0) ?
        `You need to deliver ${Museum.collection.length - _totalDonated} more items to get this achievement.` :
        undefined;

    const museumCollection: museumCollectionType = {
        totalFound: _totalFound,
        totalDelivered: _totalDonated,
        total: Museum.collection.length,
        missingItemsText: missingItemsText,
        artifacts,
        minerals
    }

    return museumCollection  
}

const ValidateKnown = (k:itemsType[], name: string) => {
    if(Array.isArray(k)){
        let known = k.find(item => item.key.string === name) 
        return known ? true : false
    }
}

/* Utility methods*/
const GetImages = (name: string): string => {
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
    
    return imageMap[name] || name.split(" ").join("_").replace(/['":]/g, "");
}

const NameTranslate = (name: string): string => {
    const nameMap: { [key: string]: string } = {
        "Cheese Cauliflower": "Cheese Cauli.",
        "Cookie": "Cookies",
        "Cranberry Sauce": "Cran. Sauce",
        "Dish O' The Sea": "Dish o' The Sea",
        "Eggplant Parmesan": "Eggplant Parm.",
        "Vegetable Medley": "Vegetable Stew"
    };
    
    return nameMap[name] || name;
}

const GetDateableNPC = (name: string): boolean => {
    const dateableNPCs = new Set([
        "Abigail", "Alex", "Elliott", "Emily", "Haley", "Harvey",
        "Leah", "Maru", "Penny", "Sam", "Sebastian", "Shane"
    ]);
    
    return dateableNPCs.has(name);
}

const GetArrayData = (arr: itemsType[]) =>{
    let data: itemFoundType[] = [];
    if(Array.isArray(arr)){
        arr.forEach(item => {
            let d: itemFoundType = {
                item: (item.key.int) ? item.key.int : item.key.string || 0,
                timesFound: item.value.int || 0
            }
            data = [...data, d]
        });
    }
    return data;
}

const GetArrayDataTimeless = (arr: itemType) =>{
    let data: string[] = [];
    if(arr && arr.item?.length > 0){ 
        arr.item.forEach(item => {
            let d = (item?.key?.int) ? item.key.int : item.key.string
            if (d !== undefined) { 
                data = [...data, typeof d === "string" ? d : d.toString()]
            }
        });
    }
    else if(!arr){
        return data
    }
    return data;
}

// const GetQuests = (arr) =>{
//     let data = []; 
//     if(Array.isArray(arr)){ 
//         arr.forEach(item => {
//             let d = item._currentObjective._text
//             data = [...data,d]
//         });
//     }
//     else if(!arr){
//         return data
//     }
//     else{
//         data = {
//             data: arr._currentObjective._text 
//         }
//     } 
//     return data;
// }

const GetSpecialRequests = (requests: questType[], info: any[], includeCompleted: boolean = true) => {
    let data: any[] = [];
    
    if (Array.isArray(requests)) {
        if (includeCompleted) {
            // Return completed requests
            requests.forEach(item => {
                let d = info.find(obj => obj.name === item);
                if (d) data = [...data, d];
            });
        } else {
            // Return pending requests (filter out completed ones)
            data = info.filter(item => !requests.includes(item.name));
        }
    } else if (!includeCompleted) {
        // If no requests and we want pending, return all info
        data = info;
    }
    
    return data;
}

const GetGrantpasEval = () =>{

}

/* Required Methods */ 
export { GetFarmHands, GetDetailedInfo};