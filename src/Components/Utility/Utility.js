const Dishes = require('../Utility/Dishes.json');

const GetProfession = (id) =>{
    let prof = ""; 
    switch(id){
        case "0":
            prof = "Rancher";
            break;
        case "1":
            prof = "Tiller";
            break;
        case "2":
            prof = "Coopmaster";
            break;
        case "3":
            prof = "Shepherd";
            break;
        case "4":
            prof = "Artisan";
            break;
        case "5":
            prof = "Agriculturist";
            break;
        case "6":
            prof = "Fisher";
            break;
        case "7":
            prof = "Trapper";
            break;
        case "8":
            prof = "Angler";
            break;
        case "9":
            prof = "Pirate";
            break;
        case "10":
            prof = "Mariner";
            break;
        case "11":
            prof = "Luremaster";
            break;
        case "12":
            prof = "Forester";
            break;
        case "13":
            prof = "Gatherer";
            break;
        case "14":
            prof = "Lumberjack";
            break;
        case "15":
            prof = "Tapper";
            break;
        case "16":
            prof = "Botanist";
            break;
        case "17":
            prof = "Tracker";
            break;
        case "18":
            prof = "Miner";
            break;
        case "19":
            prof = "Geologist";
            break;
        case "20":
            prof = "Blacksmith";
            break;
        case "21":
            prof = "Prospector";
            break;
        case "22":
            prof = "Excavator";
            break;
        case "23":
            prof = "Gemologist";
            break;
        case "24":
            prof = "Fighter";
            break;
        case "25":
            prof = "Scout";
            break;
        case "26":
            prof = "Brute";
            break;
        case "27":
            prof = "Defender";
            break;
        case "28":
            prof = "Acrobat";
            break;
        case "29":
            prof = "Desperado";
            break; 
        default:
            prof = "";
            break;
    }

    return prof;
} 
const GetLevelInfo = (xp, levelList) =>{  
    let val;
    try{ 
        val = levelList.find(level => level >= parseInt(xp))
    }
    catch(err){ 
        val = null
    }
    return (val) ? val - xp : "Maxed";  
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
const GetItemNames = (arr, itemList) =>{
    let data = [] 
    if(Array.isArray(arr)){ 
        data = arr.map((item) => itemList.find(i => (parseInt(item.item) === i.item_id) ? i.item_name : null));
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
const ValidateKnown = (k, name) => {
    if(Array.isArray(k)){
        let known = k.find(item => item.key.string._text === name) 
        return known ? true : false
    }
}
const GetCooked = (c, id) => { 
    let cooked = ""; 
    let x = 0
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
const GetCookingData = (cooked, known) =>{
    let data = [];  
    console.log("REEEE")
    Dishes.Dishes.forEach(item => {
        let d = {
            name: item.Name,
            id: item.id,
            image: GetImages(item.Name),
            times: (ValidateKnown(known, item.Name)) ? GetCooked(cooked, item.id) : undefined
        }
        data = [...data, d]
    })
    return data 
} 
const GetProfessionData = (arr) =>{
    let data = []; 
    if(Array.isArray(arr)){ 
        arr.forEach(item => {
            let d = GetProfession(item._text)
            data = [...data,d]
        });
    }
    else if(!arr){
        return data
    }
    else{
        data = {
            data: GetProfession(arr._text)
        }
    } 
    return data;
} 
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
const GetDetailedInfo = (data) =>{ 
    let playerData = []
    if(Array.isArray(data))
    data.forEach(p => { 
        playerData = [...playerData, parseData(p)]
    })
    return playerData
} 
const parseData = (data) => {
    
    /* Get name */
    let name        = data.name._text; 
    /* Get farm name */ 
    let farmName    = data.farmName._text; 
    /* Get Experience */
    let xp          =   data.experiencePoints.int.map((item) => item._text)
    /* Get professions */
    let professions = GetProfessionData(data.professions.int)
    /* Get Quest log */
    let questLog    = GetQuests(data.questLog.Quest) 
    /* Get shipped items */
    let basicShipped    = GetArrayData(data.basicShipped.item) 
    /* Get minerals found */
    let mineralsFound   = GetArrayData(data.mineralsFound.item) 
    /* Get recipes cooked */
    let recipesCooked   = GetCookingData(data.recipesCooked, data.cookingRecipes.item) 
    /* Get fish caught */
    let fishCaught      = GetArrayDataTimeless(data.fishCaught.item) 
    /* Get artifacts found */
    let archaeologyFound= GetArrayDataTimeless(data.archaeologyFound.item) 
    /* Get tailored items */
    let tailoredItems   = GetArrayDataTimeless(data.tailoredItems.item) 
    /* Get crafted items */
    let craftingRecipes = GetArrayData(data.craftingRecipes.item)
    
    let playerData = {
            playerName: name,
            farmName: farmName,
            experience: xp,
            professions: professions,
            questLog: questLog,
            ShippedItems: basicShipped,
            mineralsFound: mineralsFound,
            recipesCooked: recipesCooked,
            fishCaught: fishCaught,
            artifactsFound: archaeologyFound,
            tailoredItems: tailoredItems,
            itemsCrafted: craftingRecipes 
    }
    return playerData;
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

const GetKnownRecipes = (recipes, all) => {
    let data = [] 
    if(Array.isArray(recipes)){
        console.log("PLayer's",recipes) 
        console.log("All",all)
        data = all.map((item) => {
            return {
                Name: item,
                img: GetImages(item),
                times: recipes.find( i => (i.item === item))
            }
        })
        
    }
    else if(!recipes){
        return data
    }
    else{ 
        /*
        data = all.map((item) => {
            return {
                item: item.Name,
                times: (parseInt(dishes.item) === item.id) ? dishes : undefined,
                img: item.img
            }
        })*/
    }
    return data 
}

exports.GetProfession = GetProfession;
exports.GetItemNames = GetItemNames;
exports.GetArrayData = GetArrayData;
exports.GetArrayDataTimeless = GetArrayDataTimeless;
exports.GetQuests = GetQuests;
exports.GetProfessionData = GetProfessionData;
exports.GetFarmHands = GetFarmHands;
exports.GetDetailedInfo = GetDetailedInfo; 
exports.GetSkillName = GetSkillName;
exports.GetArtifactNames = GetArtifactNames;
exports.GetLevelInfo = GetLevelInfo; 
exports.GetKnownRecipes = GetKnownRecipes