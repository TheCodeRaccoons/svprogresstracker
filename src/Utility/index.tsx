/* eslint-disable no-loop-func */

import {
    ProfNames,
    Levels,
    ShipItems,
    Museum,
    townSR,
    QiSR
} from './JSON';

import type {
    gameLocationType,
    itemsType, 
    itemType,
    playerType,
    questType, 
    specialOrderType, 
    statValueType
} from 'types/savefile';
import type {
    generalFormatedItemType, 
    professionsType, 
    itemFoundType, 
    experienceType,
    formatedMonsterDataType,
} from 'types/displayDataTypes';
import type { fullPlayerDataType, museumCollectionType } from 'types/displayDataTypes';
import { GetCookingData } from './Parsers/parseCookingItems';
import { GetCraftingRecipes } from './Parsers/parseCraftingItems';
import { GetCropsAchievements } from './Parsers/parseCropItems';
import { GetFishes } from './Parsers/parseFishItems';
import { GetFriendshipData } from './Parsers/parseRelationshipData';
import { GetMonsterQuests } from './Parsers/parseMonsterGoals';
import { GetShippedItems } from './Parsers/parseShippedItems';

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
    console.debug(`%c Parsing data for ${playerData.name}`, 'color: #43B581')
    console.log(`Raw Player Data ${playerData.name}`, playerData) 
    let fullPlayerData : fullPlayerDataType = {
        playerName: playerData.name || "Unknown",
        farmName: playerData.farmName, //TODO: Remove and make global if even needed
        experience: GetXpInfo(playerData.experiencePoints.int), //DONE
        moneyEarned: playerData.totalMoneyEarned || 0, //DONE
        professions: GetProfessionData(playerData.professions.int) , //DONE?
        shippedItems: GetShippedItems(playerData.basicShipped),//DONE
        cropsShipped: GetCropsAchievements(playerData.basicShipped?.item),//Refactored DONE
        //mineralsFound: GetArrayData(playerData.mineralsFound?.item) || [], //DONE
        cookingData: GetCookingData(playerData.recipesCooked, playerData.cookingRecipes.item) || [], //DONE
        fishCaught: GetFishes(playerData.fishCaught.item), 
        tailoredItems: GetArrayDataTimeless(playerData.tailoredItems) || [],
        itemsCrafted: GetCraftingRecipes(playerData.craftingRecipes.item) || [],
        friendship: GetFriendshipData(playerData.friendshipData.item) || [],
        monstersKilled: GetMonsterQuests(
            playerData.stats.specificMonstersKilled.item,
            playerData.achievements?.int || []
        ) || [],
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

    console.debug(`%c Grandpa's eval for ${playerData.name}`, 'color: #7289DA') 
    console.debug("Player Data", fullPlayerData)
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
    console.debug('Profession Data:', data);
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
// const GetShippedItems = (allShipped: itemType) :generalFormatedItemType[] => { 
//     let data: generalFormatedItemType[] = []
//     if(!allShipped?.item || allShipped?.item.length === 0) return data;
//     //Parses the shipped info
//     let shipped =  allShipped.item.map( val => {return {id: val.key.int, times: val.value.int}})

//     ShipItems.shipping.forEach(item => {
//         let d = {
//             name: item.item_name,
//             image: GetImages(item.item_name),
//             id: item.item_id,
//             shipped: (shipped && shipped.length > 0 ? shipped.find(i => i.id === item.item_id )?.times || 0 : 0)
//         }
//         data.push(d);
//     }) 
//     return data;
// }

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