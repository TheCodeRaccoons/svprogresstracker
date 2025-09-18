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
import type { cropsShippedType, experienceType, gameLocationType, itemsType, itemType, playerType, recipesCookedType, shippedItemType, specialOrderType } from 'types/savefile.js';

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
        experience: GetXpInfo(playerData.experiencePoints.int),
        moneyEarned: playerData.totalMoneyEarned || 0,
        professions: GetProfessionData(playerData.professions) , 
        shippedItems: GetShippedItems(playerData.basicShipped) || [],
        cropsShipped: GetShippedCrops(playerData.basicShipped?.item),
        mineralsFound: GetArrayData(playerData.mineralsFound.item) || [],
        recipesCooked: playerData.recipesCooked.length > 0 ? GetCookingData(playerData.recipesCooked, playerData.cookingRecipes.item) : [],
        fishCaught: GetFishes(playerData.fishCaught.item) || [], 
        tailoredItems: playerData.tailoredItems ? GetArrayDataTimeless(playerData.tailoredItems) : [],
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

/* Parse the XML datainto JSON objects, I hope the names here are pretty self explanatory */
const GetCookingData = (cooked: recipesCookedType[], known: itemsType[]): recipesCookedType[] =>{
    console.log("Getting cooking data...", cooked);
    let data: recipesCookedType[] = [];
    Dishes.Dishes.forEach(item => {
        let d = {
            name: NameTranslate(item.Name),
            id: item.id,
            image: GetImages(item.Name),
            link: item.link,
            times: (ValidateKnown(known, NameTranslate(item.Name))) ? GetCooked(cooked, item.id) : 0
        }
        data = [...data, d]
    })
    return data 
}  
const GetCraftingRecipes = (recipes) => {
    let data = []  
    if(Array.isArray(recipes)) {
        CraftingRec.recipes.forEach(item => {
            let d = {
                name: item,
                image: GetImages(item),
                times: CleanTimes(recipes.find(i => i.key.string._text === item))
            }
            data = [...data, d] 
        })
    } 
    return data 
} 
const GetXpInfo = (xp: number[]): experienceType[] => {  
    let data: experienceType[] = [] 
    xp.forEach((item, id) => {
        let d: experienceType = {
            skill:  SKILLS[id] || "Unknown",
            xp: item,
            levelInfo: Levels.Levels.find((level) => level.val >= item) || { id: 10, val: 15000 }
        }
        data = [...data, d]
    })  
    return data
} 
const GetShippedItems = (allShipped: itemType) :shippedItemType[] => { 
    let data: shippedItemType[] = []
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
    let poly_crops: shippedItemType[] = [], mono_extras: shippedItemType[] = [] 
    ShipCrops.poly_crops.forEach(polycropItem => {  
        let d = {
            name: polycropItem.name,
            image: GetImages(polycropItem.name),
            id: polycropItem.id,
            shipped: (allShipped.find(i => parseInt(i.id) === polycropItem.id ) !== undefined) ? 
                allShipped.find(i => parseInt(i.id) === polycropItem.id ).shipped 
                : undefined
        }
        poly_crops = [...poly_crops, d]
    })
    ShipCrops.mono_extras.forEach(item => {
        let d = {
            name: item.name,
            image: GetImages(item.name),
            id: item.id,
            shipped:  (allShipped.find(i => parseInt(i.id) === item.id ) !== undefined) ? allShipped.find(i => parseInt(i.id) === item.id ).shipped : undefined
        }
        mono_extras = [...mono_extras, d]
    })
    
    return {poly_crops, mono_extras}
}
const GetFishes = (allFished) => { 
    let data = []

    Fishes.forEach(item => {
        let d = {
            name: item.name,
            image: GetImages(item.name),
            id: item.id,
            fished: (Array.isArray(allFished)) ? (allFished.find(i => parseInt(i.key.int._text) === item.id ) !== undefined) : false
        }
        data = [...data, d]
    }) 
    
    return  data
}
const GetFriendshipData = (allFriends) => { 
    let data = []
    if(Array.isArray(allFriends)){
        allFriends.forEach(i => {
            if(Friendship.includes(i.key.string._text)){
                let level = Math.trunc(parseInt(i.value.Friendship.Points._text) / 250)
                let d = {
                    name: i.key.string._text, 
                    dateable: GetDateableNPC(i.key.string._text),
                    points: parseInt(i.value.Friendship.Points._text),
                    level: level,
                    lvlup: 250 - (parseInt(i.value.Friendship.Points._text) - (level * 250))
                } 
                data = [...data, d] 
            } 
        })
    }
    return data
}
const GetMonsterQuests = (allMonsters, slimesKilled) => {
    let monsters = []
    if(Array.isArray(allMonsters)){ 
        allMonsters.forEach(item => {
            let m = {
                name: item.key.string._text, 
                timesKilled: parseInt(item.value.int._text)
            }
            monsters = [...monsters, m]
        })
    }
    
    if(monsters){
        let mData = []
        let sum = 0;
        for (let [key] of Object.entries(MonsterCat)) {
            sum = 0;
            MonsterCat[key].monsters.forEach(cat => { 
                let d = {
                    timesKilled: (Array.isArray(monsters)) ? monsters.find(i => i.name === cat ) !== undefined ? monsters.find(i => i.name === cat ).timesKilled : 0 : 0
                } 
                sum += d.timesKilled 
            }) 
            mData = [...mData, {
                category: key,
                goal: MonsterCat[key].goal ,
                timesKilled: (key === "Slimes") ? slimesKilled : sum,
                images: MonsterCat[key].monsters.map(m => {
                    let d = {name: m, img: GetImages(m)}
                    return d
                })
            }]
        }   
        return(mData) 
    }

    return []
}
const GetMCollection = (archeology, geology, currentCollection) =>{
    
    let currCol = (Array.isArray(currentCollection)) ? currentCollection.map(c => parseInt(c.value.int._text)) : []

    //Get found Archeology
    let currArch = []
    if(Array.isArray(archeology)) currArch = archeology.map(item => parseInt(item.key.int._text)) 
    let artifacts = []
    Museum.artifacts.forEach(a => {
        let d = {
            name: a.name,
            image: GetImages(a.name),
            found: (currArch.indexOf(a._id) !== -1),
            inMuseum: (currCol.indexOf(a._id) !== -1)
        }
        artifacts = [...artifacts, d]
    }) 

    //Get found minerals
    let currMin = []
    if(Array.isArray(geology)) currMin = geology.map(item => parseInt(item.key.int._text)) 
    let minerals = []
    Museum.minerals.forEach(m => {
        let d = {
            name: m.name,
            image: GetImages(m.name),
            found: (currMin.indexOf(m._id) !== -1),
            inMuseum: (currCol.indexOf(m._id) !== -1)
        }
        minerals = [...minerals, d]
    })

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
const GetCooked = (c, id) => { 
    let cooked = ""; 
    console.log("Getting cooked for id:", id, c) 
    if(Array.isArray(c.item)){
        let i = c.item.find(item => item.key.int === id) 
        cooked = (i !== undefined) ? i.value.int : 0  
    }
    else{
        if(!c.hasOwnProperty("item")){ 
        }else{
            cooked = (c.item.key.int === id) ? c.item.value : 0 
        }
    }
    return cooked;
}

const GetImages = (name) => {
    if(name === "Wild Seeds (Sp)"){
        return "Spring_Seeds"
    }
    if(name === "Wild Seeds (Su)"){ 
        return "Summer_Seeds"
    }
    if(name === "Wild Seeds (Fa)"){
        return "Fall_Seeds"
    }
    if(name === "Wild Seeds (Wi)") {
        return "Winter_Seeds"
    }
    if(name === "Transmute (Fe)"){
        return "Iron_Bar"
    }
    if(name === "Transmute (Au)"){
        return "Gold_Bar"
    }
    if(name === "Oil Of Garlic"){
        return "Oil_of_Garlic"
    }
    if(name === "Egg (brown)"){
        return "Brown_Egg"
    }
    if(name === "Egg (white)"){
        return "Egg"
    }
    if(name === "Large Egg (white)"){
        return "Large_Egg"
    }
    if(name === "Large Egg (brown)"){
        return "Large_Brown_Egg"
    }
    if(name === "L. Goat Milk"){
        return "Large_Goat_Milk"
    }
    return name.split(" ").join("_").replace("'","").replace(":", "").replace("", "")
}  
const CleanTimes = (obj) => {
    return (obj !== undefined ? parseInt(obj.value.int._text) : undefined)
}  
const GetProfessionData = (arr) =>{
    let data = []; 
    if(Array.isArray(arr)){ 
        arr.forEach(item => {
            let d = ProfNames.professions.find( p  => p.id === parseInt(item._text))
            data = [...data,d]
        });
    }
    else if(!arr){
        return data
    }
    else{
        data = {
            data: ProfNames.professions.find( p  => p.id === parseInt(arr._text))
        }
    }  
    return data;
}  
const GetProfession = (id) =>{
    let prof = ""; 
    switch(id){
        case 0:
            prof = "Rancher";
            break;
        case 1:
            prof = "Tiller";
            break;
        case 2:
            prof = "Coopmaster";
            break;
        case 3:
            prof = "Shepherd";
            break;
        case 4:
            prof = "Artisan";
            break;
        case 5:
            prof = "Agriculturist";
            break;
        case 6:
            prof = "Fisher";
            break;
        case 7:
            prof = "Trapper";
            break;
        case 8:
            prof = "Angler";
            break;
        case 9:
            prof = "Pirate";
            break;
        case 10:
            prof = "Mariner";
            break;
        case 11:
            prof = "Luremaster";
            break;
        case 12:
            prof = "Forester";
            break;
        case 13:
            prof = "Gatherer";
            break;
        case 14:
            prof = "Lumberjack";
            break;
        case 15:
            prof = "Tapper";
            break;
        case 16:
            prof = "Botanist";
            break;
        case 17:
            prof = "Tracker";
            break;
        case 18:
            prof = "Miner";
            break;
        case 19:
            prof = "Geologist";
            break;
        case 20:
            prof = "Blacksmith";
            break;
        case 21:
            prof = "Prospector";
            break;
        case 22:
            prof = "Excavator";
            break;
        case 23:
            prof = "Gemologist";
            break;
        case 24:
            prof = "Fighter";
            break;
        case 25:
            prof = "Scout";
            break;
        case 26:
            prof = "Brute";
            break;
        case 27:
            prof = "Defender";
            break;
        case 28:
            prof = "Acrobat";
            break;
        case 29:
            prof = "Desperado";
            break; 
        default:
            prof = "";
            break;
    }

    return prof;
} 
const NameTranslate = (name) => {
    switch(name) {
        case "Cheese Cauliflower":
            return "Cheese Cauli."
        case "Cookie":
            return "Cookies"
        case "Cranberry Sauce":
            return "Cran. Sauce"
        case "Dish O' The Sea":
            return "Dish o' The Sea"
        case "Eggplant Parmesan":
            return "Eggplant Parm."
        case "Vegetable Medley":
            return "Vegetable Stew"
        default:
            return name;
    }
}
const GetDateableNPC = (name) => {

    if( name === "Abigail" || 
        name === "Alex" || 
        name === "Elliott" || 
        name === "Emily" || 
        name === "Haley" || 
        name === "Harvey" ||  
        name === "Leah" ||  
        name === "Maru" ||  
        name === "Penny" ||  
        name === "Sam" || 
        name === "Sebastian" ||  
        name === "Shane"){
        return true
    }
    return false; 
}
const GetArrayData = (arr) =>{
    let data = [];
    if(Array.isArray(arr)){
        arr.forEach(item => {
            let d = {
                item: (item.key.int) ? item.key.int._text : item.key.string._text,
                times: item.value.int._text
            }
            data = [...data, d]
        });
    }
    else if(!arr){
        return data
    }
    else{ 
        data = {
            item: (arr.key.int) ? arr.key.int._text : arr.key.string._text,
            times: (arr.value.int) ? arr.value.int._text : arr.value.string._text
        }
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