import React from 'react'; 
import convert from 'xml-js'
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
            var p_res = convert.xml2json(d, {compact: true});
            json = JSON.parse(p_res);
        }
        catch(e){
            console.log("really m8")
        }
        if(json.SaveGame !== undefined){ 
            let prefix = d.includes("SaveGame xmlns:xsi") ? 'xsi': 'p3' 
            //console.log(json.SaveGame)
            /* Get's game prefix bc of the way the save is created in mac */
            this.props.UpdateGamePrefix(prefix) 
            /* Get the info of the museum's current collection */
            let collection = json.SaveGame.locations.GameLocation.find(loc => (loc._attributes !== undefined) ? loc._attributes[`${prefix}:type`] === "LibraryMuseum" : "" )
            let collectionStatus = this.props.GetCollection(collection)
            /*Gather special requests */
            let specialRequests = json.SaveGame.completedSpecialOrders;
            let availableSpecialRequests = json.SaveGame.availableSpecialOrders; 
            /* Gather data */
            let player          = json.SaveGame.player;
            console.log(player)
            let farmHands       = GetFarmHands(json.SaveGame.locations.GameLocation[1].buildings.Building); 
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
