import Stats from '../stats/stats.js'
import Viewer from '../Viewer/Viewer'
import Logo from '@media/Logo.png';
import fb from '@media/Social/fb.png'
import kofi from '@media/Social/kofi.png'
import twit from '@media/Social/twitter.png'
import Window4 from '@media/Windows/Window4.png'
import Loader from '@media/loader.gif'
import AdComponent from '../adsense/adComponent.js'
import { useState } from 'react';
//TODO: enable ads
//import AdSense from 'react-adsense';

const Main = () => {
    const [hasData, setHasData] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [farmhands, setFarmhands] = useState([])

    const UpdatePlayerData = (_playerData) => {
        setHasData(true);
        setShowLoader(false);
        setFarmhands(_playerData.farmhandData);
        setPlayerData(_playerData.playerData[0]);
    }

    const UpdateGamePrefix = (pref) => {
        console.log("Using prefix: " + pref)
    }

    const GetCollection = (collection) => { 
        let museumPieces = []
        if(collection.museumPieces.item !== undefined){
            museumPieces = [...collection.museumPieces.item]
        }
        return (museumPieces.length > 0) ? museumPieces : [] 
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
                        <a href="https://www.facebook.com/TheCodeRaccoons/" target="blank"><div className="media"><img src={twit} alt="twitter"/></div></a>
                        <a href="https://ko-fi.com/thecoderaccon/" target="blank"><div className="media"><img src={kofi} alt="ko-fi"/></div></a>
                        <a href="https://twitter.com/thecoderaccoons/" target="blank"><div className="media"><img src={fb} alt="facebook"/></div></a>
                    </div>
                    <div> Code by TheCodeRaccoons</div>
                </div>
                <div className="oj rotated">
                    <div className="media-container">
                        <a href="https://www.facebook.com/ookami.jime/" target="blank"><div className="media"><img src={twit} alt="twitter"/></div></a>
                        <a href="https://ko-fi.com/ookamijime/" target="blank"><div className="media"><img src={kofi} alt="ko-fi"/></div></a>
                        <a href="https://twitter.com/ookamijime/" target="blank"><div className="media"><img src={fb} alt="facebook"/></div></a>
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
                            <Stats playerData={playerData} farmhands={farmhands} /> : 
                            <Viewer 
                                UpdatePlayerData={UpdatePlayerData} 
                                UpdateGamePrefix={UpdateGamePrefix}
                                GetCollection={GetCollection}
                                ShowLoader={setShowLoader}
                            />
                    }
                </div>
                <div className="adds"> 
                </div>
            </section>
            <div className="coright" > 
                Source at GitHub, All <br /> 
                "Stardew Valley" assets <br /> 
                copyright <a  href="https://twitter.com/ConcernedApe" target="blank" >Concerned Ape</a>, 
                <br /> other assets and site design <br /> made by 
                <a  href="https://twitter.com/OokamiJime" target="blank" >Ookamijime</a></div>
        </div>
    );
}

export default Main;
