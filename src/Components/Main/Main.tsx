import Stats from '../stats/stats.js'
import Viewer from '../Viewer/Viewer.tsx'
import Logo from '@media/logo.png';
import fb from '@media/Social/fb.png'
import kofi from '@media/Social/kofi.png'
import twit from '@media/Social/twitter.png'
import Window4 from '@media/Windows/Window4.png'
import Loader from '@media/loader.gif'
import AdComponent from '../adsense/adComponent.js'
import { useState } from 'react';
import type { formattedSaveFileType, fullPlayerDataType } from 'types/displayDataTypes.js';
//TODO: enable ads
//import AdSense from 'react-adsense';

const Main = () => {
    const [hasData, setHasData] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [playerData, setPlayerData] = useState<fullPlayerDataType>({} as fullPlayerDataType);
    const [farmhands, setFarmhands] = useState<fullPlayerDataType[]>([]);
    const [globalFarmName, setFarmName] = useState("My Farm");

    const UpdatePlayerData = ({farmName, playerData, farmhandData}: formattedSaveFileType) => {
        if(!playerData) {
            console.error("No player data received in Main component");
            return;
        }
        setHasData(true);
        setShowLoader(false);
        setFarmName(farmName ? playerData.farmName : "My Farm");
        setFarmhands(farmhandData);
        setPlayerData(playerData);
    }

    return (
        <div >
            {showLoader && (
            <div className='loader loader-active'>
                <img src={Loader} alt="Loader"></img>
                <h1>Loading...</h1>
            </div>)}

            <div className="main-media">
                <div className="cr rotated">
                    <div className="media-container">
                        <a href="https://www.facebook.com/TheCodeRaccoons/" target="_blank" ><div className="media"><img src={twit} alt="twitter"/></div></a>
                        <a href="https://ko-fi.com/thecoderaccon/" target="_blank"><div className="media"><img src={kofi} alt="ko-fi"/></div></a>
                        <a href="https://twitter.com/thecoderaccoons/" target="_blank"><div className="media"><img src={fb} alt="facebook"/></div></a>
                    </div>
                    <div> Code by TheCodeRaccoons</div>
                </div>
                <div className="oj rotated">
                    <div className="media-container">
                        <a href="https://www.facebook.com/ookami.jime/" target="_blank"><div className="media"><img src={twit} alt="twitter"/></div></a>
                        <a href="https://ko-fi.com/ookamijime/" target="_blank"><div className="media"><img src={kofi} alt="ko-fi"/></div></a>
                        <a href="https://twitter.com/ookamijime/" target="_blank"><div className="media"><img src={fb} alt="facebook"/></div></a>
                    </div>
                    <div className="space-fix" > Design<br/> by Ookamijime</div>
                    </div>
            </div>
            <div className="title">
                <img src={Window4} alt="bg" className="title-background" /> 
                <div className="title-label"> 
                    <img src={Logo} alt="SV_logo" height="90%"/>
                    <h1>Stardew Valley: Progress tracker</h1> 
                </div>
            </div>
            <section className="sv-container">
                <div className="adds"> 
                </div>
                <div className="main-container"> 
                    {
                        hasData ? 
                            <Stats farmName={globalFarmName} playerData={playerData} farmhandData={farmhands} /> : 
                            <Viewer UpdatePlayerData={UpdatePlayerData} />
                    }
                </div>
                <div className="adds"> 
                </div>
            </section>
            <div className="coright" > 
                Source at GitHub, All <br /> 
                "Stardew Valley" assets <br /> 
                copyright <a  href="https://twitter.com/ConcernedApe" target="_blank" >Concerned Ape</a>, 
                <br /> other assets and site design <br /> made by 
                <a  href="https://twitter.com/OokamiJime" target="_blank" >Ookamijime</a></div>
        </div>
    );
}

export default Main;
