import React from 'react';  
import Stats from '../stats/stats'
import Viewer from '../Viewer/Viewer'
import Logo from '../../Media/logo.png'
import fb from '../../Media/Social/fb.png'
import kofi from '../../Media/Social/kofi.png'
import twit from '../../Media/Social/twitter.png'
import Window4 from '../../Media/Windows/Window4.png'
import Loader from '../../Media/loader.gif'
class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            hasData: false,
            showLoader: false
        }
    }

    ShowLoader = () =>{ 
        this.setState({showLoader: true});
    }
  
    UpdatePlayerData = (_playerData) => {
        this.setState({
            hasData: true,
            showLoader: false,
            farmhands:_playerData.farmhandData,
            playerData: _playerData.playerData[0]});
    }

    loaderShow = () =>{
        return (this.state.showLoader) ? "loader loader-active" : "loader";
    }

    render() {
        return ( 
            <div >
                <div className={this.loaderShow()}>
                    <img src={Loader} alt="Loader"></img>
                    <h1>Loading...</h1>
                </div>
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
                <div className="container">
                    <div className="adds">
                        ADS
                    </div>
                    <div className="main-container"> 
                        {
                            (this.state.hasData)? <Stats playerData={this.state.playerData} farmhands={this.state.farmhands} /> : 
                                                <Viewer UpdatePlayerData={this.UpdatePlayerData} ShowLoader={this.ShowLoader}/>
                        }
                    </div>
                    <div className="adds">
                        ADS
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
