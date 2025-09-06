import React from 'react'; 
import { XMLParser } from 'fast-xml-parser';
import Junimo6 from '../../Media/Junimo6.png'
import {GetDetailedInfo, GetFarmHands} from '../Utility/Utility' 
class Viewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    RetrivePlayerData(d){
        let json = "";
        try{
            const parser = new XMLParser({ ignoreAttributes: false });
            json = parser.parse(d);
        }
        catch(e){
            console.log("really m8")
        }
        if(json.SaveGame !== undefined){ 
            let prefix = d.includes("SaveGame xmlns:xsi") ? 'xsi': 'p3' 
            this.props.UpdateGamePrefix(prefix) 
            let collection = json.SaveGame.locations.GameLocation.find(loc => (loc['@_xsi:type'] === "LibraryMuseum" || loc['@_p3:type'] === "LibraryMuseum"));
            let collectionStatus = this.props.GetCollection(collection)
            let specialRequests = json.SaveGame.completedSpecialOrders;
            let availableSpecialRequests = json.SaveGame.availableSpecialOrders; 
            let player = json.SaveGame.player;
            let farmHands = GetFarmHands(json.SaveGame.locations.GameLocation[1].buildings?.Building); 
            let players = {
                playerData: GetDetailedInfo([player], collectionStatus, specialRequests, availableSpecialRequests),
                farmhandData: GetDetailedInfo(farmHands, collectionStatus, specialRequests, availableSpecialRequests)
            } 
            this.props.UpdatePlayerData(players) 
        }
    }
    
    onChange(e){
        let file = e.target.files; 
        let reader = new FileReader(); 
        reader.readAsText(file[0]);
        let data = null;
        
        reader.onload = (e) => { 
            data = e.target.result
            this.RetrivePlayerData(data);
        } 
    }

    render() {
        return ( 
            <div className="file-container">
                <div className="file-instructions">
                    <span className="instructions">Find your file</span>
                    <div className="filepath">Path: C:\Users\<span className="red-hl">Your user</span>\AppData\Roaming\StardewValley\Saves</div>
                </div> 
                <div className="file-drop"> 
                    <span className="instructions drop">Find your file</span>
                    <div  className="dropbox" id="dropbox"> 
                        <img src={Junimo6} alt="drop files"/>
                        <div className="default">Drag & drop your save file <br /> or Click to search</div>
                        <input type="file" name="file" onChange={(e) => {
                                this.props.ShowLoader();
                                this.onChange(e)
                            }
                        } >
                            
                        </input>
                    </div> 
                </div>
                <div id="Players"></div>  
            </div>
        );
    }
}

export default Viewer;
