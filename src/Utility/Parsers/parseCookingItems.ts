import type { itemsType, itemType } from "types/savefile";
import { Dishes } from "../JSON";
import { GetImages, ValidateKnown } from "./Utils";
import type { cookingDataType, generalFormatedItemType } from "types/displayDataTypes";

export const GetCookingData = (cooked: itemType, known: itemsType[]): cookingDataType =>{
    let data: generalFormatedItemType[] = [];
    let knownRecipes = 0;
    let alreadyCooked = 0;
    Dishes.Dishes.forEach(item => {
        let knownDish = ValidateKnown(known, translateDishNames(item.Name)) || false
        let cookedTimes = GetCooked(cooked.item, item.id)
        if(cookedTimes > 0) alreadyCooked++;
        if(knownDish) knownRecipes++;
        console.log('Dish:', item.Name, 'Known:', knownRecipes, 'CookedTimes:', alreadyCooked)
        let d = {
            name: translateDishNames(item.Name),
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

const translateDishNames = (name: string): string => {
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