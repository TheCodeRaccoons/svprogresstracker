import { useCallback, useEffect, useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { GetDetailedInfo, GetFarmHands } from '@utility/Utility';
import type { gameLocationType, itemsType, itemType, playerType, saveFileType, saveGameType, specialOrderType } from 'types/savefile';

export interface UseLoadSaveFileResult {
    playerData: any;
    fileData: any;
    isLoading: boolean;
    error: string | null;
    selectFile: (file: File) => void;
}

const useLoadSaveFile = (): UseLoadSaveFileResult => {
    const [fileData, setFileData] = useState<saveGameType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [playerData, setPlayerData] = useState<any | null>(null);

    useEffect(() => {
        if (fileData) {
            getPlayerData();
        }
    }, [fileData]);

    const selectFile = (file: File) => {
        setIsLoading(true);
        setError(null);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const xml = event.target?.result as string;
                const parser = new XMLParser({ ignoreAttributes: false });
                const json = parser.parse(xml);
                setFileData(json);
                setIsLoading(false);
                setError(null);
            } catch (err: any) {
                setError('Failed to parse the save file.');
                setFileData(null);
                setIsLoading(false);
                console.error(err);
            }
        };

        reader.onerror = () => {
        setError('Failed to read file.');
        setFileData(null);
        setIsLoading(false);
        };
        reader.readAsText(file);
    };

    const getPlayerData = useCallback(() => { 
        //getting players
        console.log("Getting player data...")
        if(!fileData) return;
        let player = fileData.SaveGame.player;
        let farmHands = GetFarmHands(fileData.SaveGame.locations.GameLocation); 
        let museumLocation: gameLocationType | undefined = fileData.SaveGame.locations.GameLocation.find((loc: gameLocationType) => {
            return loc.name === "ArchaeologyHouse";
        });
        if(!museumLocation) {
            setError("Couldn't find museum collection data");
            return;
        }
        let collectionStatus = GetCollection(museumLocation)
        let specialRequests: specialOrderType = fileData.SaveGame.completedSpecialOrders;
        let availableSpecialRequests: specialOrderType = fileData.SaveGame.availableSpecialOrders;
        let players = {
            playerData: GetDetailedInfo({
                playerData: [player],
                collectionStatus: collectionStatus,
                specialRequests: specialRequests,
                availableSpecialRequests: availableSpecialRequests
            }),
            farmhandData: GetDetailedInfo({
                playerData: farmHands,
                collectionStatus: collectionStatus,
                specialRequests: specialRequests,
                availableSpecialRequests: availableSpecialRequests
            })
        }

        console.log("Players:", players)
        setPlayerData(players)
    }, [fileData])

    const GetCollection = (collection: gameLocationType) => { 
        let museumPieces: itemsType[] | [] = []
        if(collection.museumPieces.item && collection.museumPieces.item !== undefined && collection.museumPieces.item.length > 0){
            museumPieces = [...collection.museumPieces.item]
        }
        // console.log(museumPieces)

        return (museumPieces.length > 0) ? [...museumPieces] : [] 
    }

    return {
        playerData,
        fileData,
        isLoading,
        error,
        selectFile,
    };
};

export default useLoadSaveFile;