import { Museum } from "@utility/JSON";
import type { generalFormatedItemType, museumCollectionType } from "types/displayDataTypes";
import type { itemsType } from "types/savefile";
import { GetImages } from "./Utils";
import { CompleteCollection } from "@media/Achievements";

type GetMuseumCollectionType = {archeology?: itemsType[], geology?: itemsType[], currentCollection?: itemsType[]}

export const GetMuseumCollection = ({
    archeology = [], 
    geology = [], 
    currentCollection = []
}: GetMuseumCollectionType) : museumCollectionType => {

    let artifacts: generalFormatedItemType[] = [];
    let minerals: generalFormatedItemType[] = []
    let _totalFound = 0;
    let _totalDonated = currentCollection.length || 0;
    console.group("Museum Collection Parser");
    console.log("Parsing Museum Collection Data");
    console.log("Current Collection:", currentCollection);
    console.log("Archeology Items:", archeology);
    console.log("Geology Items:", geology);
    console.groupEnd();
    
let MuseumAchievements = [{
        goal: Museum.collection.length,
        image: CompleteCollection,
        name: 'Complete Collection',
        done: false,
        description: 'Donate all items to the museum.',
        hoverDesc: ''
    }
];

    //loop through full museum collection
    for(let collectionItem of Museum.collection) {
        if( collectionItem.type === "artifact"){
            let found = archeology.filter((archeologyItem) => {
                return archeologyItem.key.int === collectionItem.id || archeologyItem.key.string === collectionItem.id
            }).length > 0;
            _totalFound = found ? _totalFound + 1 : _totalFound;
            artifacts.push({
                id: collectionItem.id,
                name: collectionItem.name,
                image: GetImages(collectionItem.name),
                found: found,
                inMuseum: false
            })
        } else if(collectionItem.type === "mineral"){
            let found = geology.filter((geologyItem) => {
                return geologyItem.key.int === collectionItem.id || geologyItem.key.string === collectionItem.id
            }).length > 0;
            _totalFound = found ? _totalFound + 1 : _totalFound;
            minerals.push({
                id: collectionItem.id,
                name: collectionItem.name,
                image: GetImages(collectionItem.name),
                found: found,
                inMuseum: false
            })
        }
    }

    //check which items have been donated
    for(let mineral of minerals){
        let alreadyDonated = currentCollection.filter((c) => 
            c.value.int === mineral.id || c.value.string === mineral.id).length > 0;
        mineral.inMuseum = alreadyDonated;
    }
    for(let artifact of artifacts){
        let alreadyDonated = currentCollection.filter((c) => 
            c.value.int === artifact.id || c.value.string === artifact.id).length > 0;
        artifact.inMuseum = alreadyDonated;
    }

    let missingItemsText = (Museum.collection.length - _totalDonated > 0) ?
        `You need to donate ${Museum.collection.length - _totalDonated} more items to get this achievement.` :
        undefined;

    for (let ach of MuseumAchievements){
        ach.done = _totalDonated >= Museum.collection.length;
        ach.hoverDesc = ach.done ? 
            'Achievement unlocked!' : 
            missingItemsText || '';
    }
        
    const museumCollection: museumCollectionType = {
        totalFound: _totalFound,
        totalDelivered: _totalDonated,
        total: Museum.collection.length,
        artifacts,
        minerals,
        achievements: MuseumAchievements
    }

    return museumCollection  
}
