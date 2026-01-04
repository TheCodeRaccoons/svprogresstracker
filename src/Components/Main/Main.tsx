/* eslint-disable react/jsx-no-target-blank */
import Stats from '../stats/stats.js'
import Viewer from '../Viewer/Viewer.tsx'
import Logo from '@media/logo.png';
import Window4 from '@media/Windows/Window4.png'
import Loader from '@media/loader.gif'
import AdComponent from '../adsense/adComponent.js'
import { useEffect, useState } from 'react';
import type { formattedSaveFileType, fullPlayerDataType } from 'types/displayDataTypes.js';
import useLoadSaveFile from '@hooks/useLoadSaveFile';
//TODO: enable ads
//import AdSense from 'react-adsense';

const Main = () => {
    const [hasData, setHasData] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [playerData, setPlayerData] = useState<fullPlayerDataType>({} as fullPlayerDataType);
    const [farmhands, setFarmhands] = useState<fullPlayerDataType[]>([]);
    const [globalFarmName, setFarmName] = useState("My Farm");

    const { playerData: parsedData, isLoading, error, selectFile } = useLoadSaveFile();

    const handleFileChange = (file: File) => {
        setShowLoader(true);
        selectFile(file);
    };

    useEffect(() => {
        if (error) {
            setShowLoader(false);
        }
    }, [error]);

    const UpdatePlayerData = ({ farmName, playerData, farmhandData }: formattedSaveFileType) => {
        if (!playerData) {
            console.error("No player data received in Main component");
            return;
        }
        setHasData(true);
        setShowLoader(false);
        setFarmName(farmName ?? playerData.farmName ?? "My Farm");
        setFarmhands(farmhandData);
        setPlayerData(playerData);
    };

    useEffect(() => {
        if (parsedData) {
            UpdatePlayerData({
                farmName: parsedData.playerData?.farmName,
                playerData: parsedData.playerData,
                farmhandData: parsedData.farmhandData,
            });
        }
    }, [parsedData]);

    return (
        <div >
            {showLoader && (
            <div className='loader loader-active'>
                <img src={Loader} alt="Loader"></img>
                <p>Loading...</p>
            </div>)}
            <div className="title">
                <img src={Window4} alt="bg" className="title-background" /> 
                <div className="title-label"> 
                    <img src={Logo} alt="SV_logo" height="90%"/>
                    <h1>Stardew Valley: Progress tracker</h1> 
                </div>
            </div>
            <section className="sv-container">
                <div className="main-container"> 
                    { hasData && !error ? 
                        <Stats farmName={globalFarmName} playerData={playerData} farmhandData={farmhands} />
                        : <Viewer 
                            onFileChange={handleFileChange} 
                            isLoading={isLoading || showLoader} 
                            error={error || null} 
                        />
                    }
                </div>
            </section>
            <div className="copyright" > 
                Built by&nbsp;
                <a href="https://thecoderaccoons.com" rel="me" target="_blank" >TheCodeRaccoons</a>. 
                &nbsp;All "Stardew Valley" assets copyright&nbsp;
                <a href="https://twitter.com/ConcernedApe" target="_blank" >Concerned Ape</a>, 
                &nbsp;other assets and site design made by&nbsp;
                <a href="https://jimenafdz.webflow.io/" rel="me" target="_blank" >Ookamijime</a>
            </div>
        </div>
    );
}

export default Main;
