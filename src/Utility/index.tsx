/* eslint-disable no-loop-func */

import {
    ProfNames,
    Levels,
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
} from 'types/savefile';
import type {
    generalFormatedItemType, 
    professionsType,
    experienceType,
} from 'types/displayDataTypes';
import type { fullPlayerDataType, museumCollectionType } from 'types/displayDataTypes';
import { 
    cookingParser, 
    craftingParser, 
    cropsParser, 
    earningsParser, 
    fishParser, 
    friendshipParser, 
    monstersParser, 
    museumCollectionParser, 
    shippingParser 
} from './Parsers';


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
    let fullPlayerData : fullPlayerDataType = {
        playerName: playerData.name || "Unknown",
        farmName: playerData.farmName, //TODO: Remove and make global if even needed
        experience: GetXpInfo(playerData.experiencePoints.int), //DONE
        moneyEarned: earningsParser(playerData.totalMoneyEarned || 0), //DONE
        professions: GetProfessionData(playerData.professions.int) , //DONE?
        shippedItems: shippingParser(playerData.basicShipped),//DONE
        cropsShipped: cropsParser(playerData.basicShipped?.item),//Refactored DONE
        //mineralsFound: GetArrayData(playerData.mineralsFound?.item) || [], //DONE
        cookingData: cookingParser(playerData.recipesCooked, playerData.cookingRecipes.item) || [], //DONE
        fishCaught: fishParser(playerData.fishCaught.item), 
        tailoredItems: GetArrayDataTimeless(playerData.tailoredItems) || [],
        itemsCrafted: craftingParser(playerData.craftingRecipes.item) || [],
        friendship: friendshipParser(playerData.friendshipData.item) || [],
        monstersKilled: monstersParser(
            playerData.stats.specificMonstersKilled.item,
            playerData.achievements?.int || []
        ) || [],
        museumCollection: museumCollectionParser({
            archeology: playerData.archaeologyFound.item, 
            geology: playerData.mineralsFound.item, 
            currentCollection: collectionStatus
        }),
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