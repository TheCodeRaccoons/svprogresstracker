/* eslint-disable no-loop-func */

import {
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
import type { fullPlayerDataType } from 'types/displayDataTypes';
import { 
    cookingParser, 
    craftingParser, 
    cropsParser, 
    earningsParser, 
    fishParser, 
    friendshipParser, 
    monstersParser, 
    museumCollectionParser, 
    shippingParser,
    professionsParser
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
        experience: professionsParser(playerData.experiencePoints.int, playerData.professions.int), //DONE
        moneyEarned: earningsParser(playerData.totalMoneyEarned || 0), //DONE
        shippedItems: shippingParser(playerData.basicShipped),//DONE
        cropsShipped: cropsParser(playerData.basicShipped?.item),//Refactored DONE
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