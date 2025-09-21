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
    cropsShippedType, 
    experienceType, 
    formatedFriendshipDataType, 
    formatedMonsterDataType, 
    friendshipDataType, 
    gameLocationType, 
    generalFormatedItemType, 
    itemFoundType, 
    itemsType, 
    itemType, 
    playerType, 
    professionsType, 
    specialOrderType 
} from 'types/savefile.js';

const SKILLS = ["Farming", "Fishing", "Foraging", "Mining", "Combat"]

/* Gather the XML and handling the file */
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
const GetDetailedInfo = ({playerData , collectionStatus, specialRequests, availableSpecialRequests}: getDetailedInfoType) =>{ 
    let fullPlayerData: any = []
    if(Array.isArray(playerData)){
        playerData.forEach(p => { 
            let playerFull = {
                ...p, ...parseData({playerData: p, collectionStatus, specialRequests, availableSpecialRequests})
            }
            fullPlayerData.push(playerFull)
        }) 
    }
    
    return fullPlayerData;
} 
    
//Creates an object per player with the cleanup playerData.from the file
const parseData = ({playerData, collectionStatus, specialRequests, availableSpecialRequests}: getParsedUserDataType) => { 
    if(!playerData) return null;
    //Not finished  
    console.log("Parsing data for:", playerData)
    let fullPlayerData = {
        playerName: playerData.name,
        farmName: playerData.farmName, //TODO: Remove and make global if even needed
        experience: GetXpInfo(playerData.experiencePoints.int), //DONE
        moneyEarned: playerData.totalMoneyEarned || 0, //DONE
        professions: GetProfessionData(playerData.professions.int) , //DONE?
        shippedItems: GetShippedItems(playerData.basicShipped) || [],//DONE
        cropsShipped: GetShippedCrops(playerData.basicShipped?.item),//DONE
        mineralsFound: GetArrayData(playerData.mineralsFound?.item) || [], //DONE
        cookedItems: GetCookingData(playerData.recipesCooked, playerData.cookingRecipes.item) || [], //DONE
        fishCaught: GetFishes(playerData.fishCaught.item) || [], 
        tailoredItems: GetArrayDataTimeless(playerData.tailoredItems) || [],
        itemsCrafted: GetCraftingRecipes(playerData.craftingRecipes.item) || [],
        friendship: GetFriendshipData(playerData.friendshipData.item) || [],
        monstersKilled: GetMonsterQuests(playerData.stats.specificMonstersKilled.item, playerData.stats.slimesKilled) || [],
        museumCollection: GetMCollection(playerData.archaeologyFound.item, playerData.mineralsFound.item, collectionStatus) || {},
        questsDone: playerData.stats.questsCompleted || 0,
        specialRequests: specialRequests?.SpecialOrder ? GetSpecialRequests(specialRequests.SpecialOrder, townSR.Requests) : [],
        availableSpecialRequests: specialRequests?.SpecialOrder ? GetPendingSpecialRequests(specialRequests.SpecialOrder, townSR.Requests) : []
    }

    console.log(`%c Grandpa's eval for ${playerData.name}`, 'color: #7289DA') 
    console.log("Player Data", fullPlayerData)
    return fullPlayerData;
} 

const GetCookingData = (cooked: itemType, known: itemsType[]): generalFormatedItemType[] =>{
    let data: generalFormatedItemType[] = [];
    Dishes.Dishes.forEach(item => {
        let knownDish = ValidateKnown(known, NameTranslate(item.Name)) || false
        let d = {
            name: NameTranslate(item.Name),
            id: item.id,
            image: GetImages(item.Name),
            link: item.link,
            knownDish: knownDish,
            times: knownDish ? GetCooked(cooked.item, item.id) : 0
        }
        data = [...data, d]
    })
    return data 
}

const GetCooked = (cookedItems:itemsType[], id: number): number => { 
    let cooked = 0; 
    if(Array.isArray(cookedItems)){
        let i = cookedItems.find(item => item.key.int === id) 
        cooked = (i !== undefined) ? i.value.int : 0  
    }
    return cooked;
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
            data = [...data, d] 
        })
    } 
    return data 
}

const GetXpInfo = (xp: number[]): experienceType[] => {  
    let data: experienceType[] = [] 
    xp.forEach((item, id) => {
        if (SKILLS[id] !== undefined){
            let d: experienceType = {
                skill:  SKILLS[id] || "Unknown",
                xp: item,
                levelInfo: Levels.Levels.find((level) => level.val >= item) || { id: 10, val: 15000 }
            }
            data = [...data, d]
        }
    })  
    return data
} 
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
        data = [...data, d]
    }) 
    return data;
}

const GetShippedCrops = (allShipped: itemsType[]) : cropsShippedType => { 
    let poly_crops: generalFormatedItemType[] = [], mono_extras: generalFormatedItemType[] = [] 
    ShipCrops.poly_crops.forEach(polycropItem => {  
        let d = {
            name: polycropItem.name,
            image: GetImages(polycropItem.name),
            id: polycropItem.id,
            shipped: (allShipped && allShipped.length > 0) ? 
                allShipped.find(i => i.key.int === polycropItem.id )?.value?.int || 0 : 0
        }
        poly_crops = [...poly_crops, d]
    })
    ShipCrops.mono_extras.forEach(monoCropItem => {
        let d = {
            name: monoCropItem.name,
            image: GetImages(monoCropItem.name),
            id: monoCropItem.id,
            shipped:  (allShipped && allShipped.length > 0) ?
            allShipped.find(i => i.key.int === monoCropItem.id )?.value?.int || 0 : 0
        }
        mono_extras = [...mono_extras, d]
    })
    
    return {poly_crops, mono_extras}
}
const GetFishes = (allFished: itemsType[]) => { 
    let data: generalFormatedItemType[] = []

    Fishes.forEach(item => {
        let d = {
            name: item.name,
            image: GetImages(item.name),
            id: item.id,
            fished: (Array.isArray(allFished)) ? (allFished.find(i => i.key.int === item.id ) !== undefined) : false
        }
        data = [...data, d]
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
const GetMCollection = (archeology: itemsType[], geology: itemsType[], currentCollection: itemsType[]) =>{

    if(currentCollection === undefined || currentCollection.length === 0) return {artifacts: [], minerals: []};

    //Get found Archeology
    let artifacts: generalFormatedItemType[] = [];
    let minerals: generalFormatedItemType[] = []

    console.log("Current Museum collection:", currentCollection, "Archeology found:", archeology, "Geology found:", geology)
    for(let collectionItem of Museum.collection) {
        if( archeology && archeology.length > 0 && collectionItem.type === "artifact"){
            artifacts.push({
                name: collectionItem.name,
                image: GetImages(collectionItem.name),
                found: (archeology && archeology.length > 0 && archeology.filter(a => a.key.int === collectionItem.id).length > 0),
                inMuseum: (currentCollection.filter(c => c.value.int === collectionItem.id).length > 0)
            })
        } else if(geology && geology.length > 0 && collectionItem.type === "mineral"){
            minerals.push({
                name: collectionItem.name,
                image: GetImages(collectionItem.name),
                found: (geology && geology.length > 0 && geology.filter(g => g.key.int === collectionItem.id).length > 0),
                inMuseum: (currentCollection.filter(c => c.value.int === collectionItem.id).length > 0)
            })
        }
    }
    return {artifacts, minerals}  
}

/* Utility methods */ 
const GetLevelInfo = (xp) =>{  
    let val;
    try{ 
        val = Levels.Levels.find((level, i) => level.val >= parseInt(xp))
        val = (val === undefined) ? {"id": 10,"val": 15000} : val; 
    }
    catch(err){ 
        val = parseInt(xp)
    } 
    return val;  
} 
const ValidateKnown = (k:itemsType[], name: string) => {
    if(Array.isArray(k)){
        let known = k.find(item => item.key.string === name) 
        return known ? true : false
    }
}


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

const CleanTimes = (obj: itemsType) => {
    return (obj !== undefined ? obj.value.int : 0)
}  
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
    return data;
}

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
const GetQuests = (arr) =>{
    let data = []; 
    if(Array.isArray(arr)){ 
        arr.forEach(item => {
            let d = item._currentObjective._text
            data = [...data,d]
        });
    }
    else if(!arr){
        return data
    }
    else{
        data = {
            data: arr._currentObjective._text 
        }
    } 
    return data;
}  

const GetSpecialRequests = (requests, info) =>{ 
    let data = [];  
    if(Array.isArray(requests)){ 
        requests.forEach(item => {
            let d = info.find(obj => obj.name === item._text) 
            data = [...data,d]
        });
    } 
    return data
} 
const GetPendingSpecialRequests= (requests, info) =>{ 
    let data = info;  
    if(Array.isArray(requests)){  

        requests.forEach(req =>{ data = data.filter(item => item.name !== req._text)})
    } 
    return data
}

const GetGrantpasEval = () =>{



}

/* Required Methods */ 
export { GetFarmHands, GetDetailedInfo};