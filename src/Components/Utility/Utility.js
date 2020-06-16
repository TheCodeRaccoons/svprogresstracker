const Dishes = require('../Utility/Dishes.json');
const CraftingRec = require('../Utility/CraftingRecipes.json'); 
const ProfNames = require('../Utility/professions.json'); 
const Levels = require('../Utility/levels.json'); 
const ShipItems = require('../Utility/shippingItems.json'); 
const ShipCrops = require('../Utility/shippingCrops.json'); 
const Fishes = require('../Utility/fishes.json'); 
const Friendship = require('../Utility/friendship.json'); 

/* Gather the XML and handling the file */
//Gets the info from the farm hands as an array of the same type
const GetFarmHands = (arr) =>{
    let data = []  
    if(Array.isArray(arr)){
        arr.forEach(building => {
            if(building.indoors)
            { 
                if(building.indoors.farmhand) 
                data = [...data, building.indoors.farmhand];
            } 
        })
    }
    else data = []

    return data;
}  
//Calls the parser and creates an array of players depending on wether it is a single player or multiple
const GetDetailedInfo = (data) =>{ 
    let playerData = []
    if(Array.isArray(data))
    data.forEach(p => { 
        playerData = [...playerData, parseData(p)]
    })
    return playerData
} 
//Creates an object per player with the cleanup data from the file
const parseData = (data) => {
    
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
    //Not finished  
    /* Get professions */
    let professions = GetProfessionData(data.professions.int)
    /* Get Quest log */
    let questLog    = GetQuests(data.questLog.Quest) 
    /* Get minerals found */
    let mineralsFound   = GetArrayData(data.mineralsFound.item) 
    /* Get artifacts found */
    let archaeologyFound= GetArrayDataTimeless(data.archaeologyFound.item) 
    /* Get tailored items */
    let tailoredItems   = GetArrayDataTimeless(data.tailoredItems.item) 
    
    let playerData = {
            playerName: name,
            farmName: farmName,
            experience: xp,
            professions: professions,
            questLog: questLog,
            shippedItems: basicShipped,
            cropsShipped: cropsShipped,
            mineralsFound: mineralsFound,
            recipesCooked: recipesCooked,
            fishCaught: fishCaught,
            artifactsFound: archaeologyFound,
            tailoredItems: tailoredItems,
            itemsCrafted: craftingRecipes,
            friendship: FriendshipData
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
            times: (ValidateKnown(known, NameTranslate(item.Name))) ? GetCooked(cooked, item.id) : undefined
        }
        data = [...data, d]
    })
    return data 
}  
const GetCraftingRecipes = (recipes) => {
    let data = []  
    if(Array.isArray(recipes)) {
        CraftingRec.recipes.map(item => {
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
    xp.map((item, id) => {
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

    ShipItems.shipping.map(item => {
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

    ShipCrops.poly_crops.map(item => {
        let d = {
            name: item.name,
            image: GetImages(item.name),
            id: item.id,
            shipped:  allShipped.find(i => parseInt(i.id) === item.id ).shipped
        }
        poly_crops = [...poly_crops, d]
    })
    ShipCrops.mono_extras.map(item => {
        let d = {
            name: item.name,
            image: GetImages(item.name),
            id: item.id,
            shipped:  allShipped.find(i => parseInt(i.id) === item.id ).shipped
        }
        mono_extras = [...mono_extras, d]
    })
    
    return {poly_crops, mono_extras}
}
const GetFishes = (allFished) => { 
    let data = []

    Fishes.map(item => {
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
        allFriends.map(i => {
            if(Friendship.includes(i.key.string._text)){
                let level = Math.trunc(parseInt(i.value.Friendship.Points._text) / 250)
                let d = {
                    name: i.key.string._text, 
                    points: parseInt(i.value.Friendship.Points._text),
                    level: level,
                    lvlup: 250 - (parseInt(i.value.Friendship.Points._text) - (level * 250))
                } 
                data = [...data, d] 
            }
            else{
                console.log(i.key.string._text)
            }
        })
    }
    return data
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
    return name.split(" ").join("_").replace("'","").replace(":", "")
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
const GetArtifactNames = (arr, itemList) =>{
    let data = [] 
    if(Array.isArray(arr)){ 
        data = arr.map((item) => itemList.find(i => (parseInt(item) === i.item_id) ? i.item_name : "" ).item_name);
    }
    else if(!arr){
        return data
    }
    else{ 
        return data
    }
    return data 
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

/* Required Methods */
exports.GetProfession = GetProfession; 
exports.GetFarmHands = GetFarmHands; 


exports.GetArrayData = GetArrayData;
exports.GetArrayDataTimeless = GetArrayDataTimeless;
exports.GetQuests = GetQuests;
exports.GetProfessionData = GetProfessionData;
exports.GetFarmHands = GetFarmHands;
exports.GetDetailedInfo = GetDetailedInfo;  
exports.GetArtifactNames = GetArtifactNames; 