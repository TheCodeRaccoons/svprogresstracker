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
import type { gameLocationType, playerType } from 'types/savefile.js';

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

//Calls the parser and creates an array of players depending on wether it is a single player or multiple
const GetDetailedInfo = (playerData , collectionStatus, specialRequests, pendingSpecialRequests) =>{ 
    let fullPlayerData = []
    if(Array.isArray(playerData)){
        playerData.forEach(p => { 
            playerData = [...playerData, parseData(p, collectionStatus, specialRequests, pendingSpecialRequests)]
        }) 
    }
    
    return playerData
} 
//Creates an object per player with the cleanup data from the file
const parseData = (data, collectionStatus,specialRequests, pendingSpecialRequests) => { 
    /* Get name */ //Done
    let name        = data.name._text; 
    /* Get farm name */ //Done
    let farmName    = data.farmName._text; 
    /* Get Experience */ //Done
    let xp =  GetXpInfo(data.experiencePoints.int) 
    /* Get recipes cooked */ //Done
    let recipesCooked   = GetCookingData(data.recipesCooked, data.cookingRecipes.item) 
    /* Get crafted items */ //Done
    let craftingRecipes = GetCraftingRecipes(data.craftingRecipes.item) 
    /* Get shipped items */ 
    let basicShipped    = GetShippedItems(data.basicShipped.item) 
    /* Get shipped Crops */
    let cropsShipped    = GetShippedCrops(basicShipped)
    /* Get fish caught */
    let fishCaught      = GetFishes(data.fishCaught.item) 
    /* Get Friendship Data */
    let FriendshipData  = GetFriendshipData(data.friendshipData.item)
    /* Get Specific monsters killed */
    let slimesKilled = (data.stats.slimesKilled._text !== undefined) ? parseInt(data.stats.slimesKilled._text) : 0
    let specificMonsters = GetMonsterQuests(data.stats.specificMonstersKilled.item, slimesKilled)
    /* Get total money earned */
    let moneyEarned = parseInt(data.totalMoneyEarned._text)
    /* Get Museum collection */
    /* Get minerals found */
    let mineralsFound   = GetArrayData()  
    /* Get artifacts found */ 
    let museumCollection = GetMCollection(data.archaeologyFound.item, data.mineralsFound.item, collectionStatus)
    /* Get No. of quests finished */
    let questsDone = (data.stats.questsCompleted !== undefined) ? parseInt(data.stats.questsCompleted._text) : 0
    /*Get Special requests */ 
    let SpecialReqDone = GetSpecialRequests(specialRequests.string, townSR.Requests) 
    let SpecialReqPending = GetPendingSpecialRequests(specialRequests.string, townSR.Requests) 
 

    
    console.log("%c Grandpa's eval", 'color: #7289DA')
    console.group() 
    console.log("Name", name)
    console.log("Farm name", farmName)
    console.log("shipped items", basicShipped.filter(i => i.shipped !== undefined).length)
    console.log("shipped crops", cropsShipped.poly_crops.filter(i => i.shipped !== undefined).length + cropsShipped.mono_extras.filter(i => i.shipped !== undefined).length)
    console.log("crops shipped", cropsShipped)
    console.log("recipes cooked", recipesCooked.filter(i => i.times !== undefined && i.times > 0).length)
    console.log("crafting recipes", craftingRecipes.filter(i => i.times !== undefined && i.times > 0).length)
    console.log("crafting recipes full", craftingRecipes)
    console.log("fish caught", fishCaught.filter(i => i.fished !== false).length)
    console.log("fish caught full", fishCaught)
    console.log("monsters killed", specificMonsters.reduce((a, b) => a + b.timesKilled, 0))
    console.log("monsters killed full", specificMonsters)
    console.log("quests done", questsDone)
    console.log("special requests done", SpecialReqDone.length)
    console.log("rusty key", data.hasRustyKey._text)
    console.log("Skull key",data.hasSkullKey._text)
    console.log("money", moneyEarned)
    console.log("museum", collectionStatus)
    console.log("fish", fishCaught)
    console.log("Master of 5 ways", xp)
    console.log("Legend", "NA")
    console.log("friendship", FriendshipData)
    console.log("Pet", FriendshipData)
    console.log("married")
    console.log("skull key")
    console.log("rusty key")
    console.log("total skill points") 
    console.groupEnd();

    //Not finished  
    /* Get professions */
    let professions = GetProfessionData(data.professions.int) 
    /* Get tailored items */
    let tailoredItems   = GetArrayDataTimeless(data.tailoredItems.item) 

    let playerData = {
            playerName: name,
            farmName: farmName,
            experience: xp,
            moneyEarned: moneyEarned,
            professions: professions, 
            shippedItems: basicShipped,
            cropsShipped: cropsShipped,
            mineralsFound: mineralsFound,
            recipesCooked: recipesCooked,
            fishCaught: fishCaught, 
            tailoredItems: tailoredItems,
            itemsCrafted: craftingRecipes,
            friendship: FriendshipData,
            monstersKilled: specificMonsters,
            museumCollection: museumCollection,
            questsDone: questsDone,
            specialRequests: SpecialReqDone,
            pendingSpecialRequests: SpecialReqPending
    } 
    return playerData;
} 

/* Parse the XML data into JSON objects, I hope the names here are pretty self explanatory */
const GetCookingData = (cooked, known) =>{
    let data = [];
    Dishes.Dishes.forEach(item => {
        let d = {
            name: NameTranslate(item.Name),
            id: item.id,
            image: GetImages(item.Name),
            link: item.link,
            times: (ValidateKnown(known, NameTranslate(item.Name))) ? GetCooked(cooked, item.id) : undefined
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
const GetXpInfo = (xp) => {  
    let data = [] 
    xp.forEach((item, id) => {
        let d = {
            skill: GetSkillName(id),
            xp: parseInt(item._text),
            levelInfo: GetLevelInfo(item._text) 
        }
        data = [...data, d]
    })  
    return data
} 
const GetShippedItems = (allShipped) => { 
    let data = []
    //Parses the shipped info
    let shipped =  (Array.isArray(allShipped)) ? allShipped.map( val => {return {id: val.key.int._text, times: val.value.int._text}}) : []

    ShipItems.shipping.forEach(item => {
        let d = {
            name: item.item_name,
            image: GetImages(item.item_name),
            id: item.item_id,
            shipped: (Array.isArray(shipped) ? shipped.find(i => parseInt(i.id) === item.item_id ) : false)
        }
        data = [...data, d]
    }) 
    return data;
}
const GetShippedCrops = (allShipped) => { 
    let poly_crops = [], mono_extras = [] 
    ShipCrops.poly_crops.forEach(item => {  
        let d = {
            name: item.name,
            image: GetImages(item.name),
            id: item.id,
            shipped: (allShipped.find(i => parseInt(i.id) === item.id ) !== undefined) ? allShipped.find(i => parseInt(i.id) === item.id ).shipped : undefined
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
const ValidateKnown = (k, name) => {
    if(Array.isArray(k)){
        let known = k.find(item => item.key.string._text === name) 
        return known ? true : false
    }
}
const GetCooked = (c, id) => { 
    let cooked = "";  
    if(Array.isArray(c.item)){
        let i = c.item.find(item => parseInt(item.key.int._text) === id) 
        cooked = (i !== undefined) ? parseInt(i.value.int._text) : 0  
    }
    else{
        if(!c.hasOwnProperty("item")){ 
        }else{
            cooked = (parseInt(c.item.key.int._text) === id) ? parseInt(c.item.value.int._text) : 0 
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
const GetArrayDataTimeless = (arr) =>{
    let data = []; 
    if(Array.isArray(arr)){ 
        arr.forEach(item => {
            let d = (item.key.int) ? item.key.int._text : item.key.string._text 
            data = [...data,d]
        });
    }
    else if(!arr){
        return data
    }
    else{
        data = {
            item: (arr.key.int) ? arr.key.int._text : arr.key.string._text
        }
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
const GetSkillName = (skillId) =>{
    switch(skillId){
        case 0:
            return "Farming" 
        case 1: 
            return "Fishing"
        case 2:
            return "Foraging"  
        case 3:
            return "Mining"  
        case 4:
            return "Combat"  
        default:
            return "Unknown" 
    }
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