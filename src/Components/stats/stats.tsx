import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Skills from '../Skills/Skills'
import Achievements from '../Achievements/Achievements' 
import Junimo1a from '../../Media/Junimo1.png'
import Junimo2a from '../../Media/Junimo2.png'
import Junimo3a from '../../Media/Junimo3.png'
import Junimo4a from '../../Media/Junimo4.png'
import Junimo1  from '../../Media/Junimo1B.png'
import Junimo2  from '../../Media/Junimo2B.png'
import Junimo3  from '../../Media/Junimo3B.png' 
import Junimo4  from '../../Media/Junimo4B.png' 
import Rope     from '../../Media/Rope.png'
import type { formattedSaveFileType, fullPlayerDataType } from 'types/displayDataTypes';



const Stats = ({playerData, farmName, farmhandData}: formattedSaveFileType) => {
    const [globalFarmName] = useState(farmName || "My Farm");
    const [junimos] = useState([Junimo1, Junimo2, Junimo3, Junimo4]);
    const [Activejunimos] = useState([Junimo1a, Junimo2a, Junimo3a, Junimo4a]);

    const titles = farmhandData.map((item, i) => 
        <Tab key={i}>
            <img src={junimos[i + 1]} alt="Jun"></img> {item.playerName}
        </Tab>
    );
    

    const playerStats = farmhandData.map((item, i) => (
        <TabPanel key={i}>
            <section className="wrapper">
                <Skills {...item.experience}></Skills>
                <div className="ropes">
                    <img src={Rope} alt=""></img>
                    <img src={Rope} alt=""></img>
                </div>
                <Achievements 
                    recipesCooked={item.cookedItems}
                    itemsCrafted={item.itemsCrafted}  
                    cropsShipped={item.cropsShipped} 
                    fishCaught={item.fishCaught}
                    friendship={item.friendship}
                    monstersKilled={item.monstersKilled}
                    shippedItems={item.shippedItems}
                    moneyEarned={item.moneyEarned}
                    museumCollection={item.museumCollection}
                    questsDone={item.questsDone}
                    specialReq={item.specialRequests}
                    pendingSpecialReq={item.pendingSpecialRequests}
                ></Achievements>
            </section> 
        </TabPanel>
    ));
    console.log("Rendering Stats component with playerData:", playerData, "experience:", playerData.experience);
    return ( 
        <div className="file-container">  
            <div className="farmName"><h2>Farm: {globalFarmName}</h2></div> 
            <section className="scroller"> 
                            { playerData ? (
                <Tabs>
                    <TabList> 
                        <Tab><img src={junimos[0]} alt="Junimo" width="25px"></img>{playerData.playerName}</Tab>
                        {titles}
                    </TabList>
                
                    <TabPanel>
                        <section className="wrapper">
                            <>
                            <Skills experience={playerData.experience}></Skills>
                            <div className="ropes">
                                <img src={Rope} alt=""></img>
                                <img src={Rope} alt=""></img>
                            </div> 
                            <Achievements 
                                recipesCooked={playerData.cookedItems} 
                                itemsCrafted={playerData.itemsCrafted}  
                                cropsShipped={playerData.cropsShipped}  
                                fishCaught={playerData.fishCaught}
                                friendship={playerData.friendship}
                                monstersKilled={playerData.monstersKilled}
                                shippedItems={playerData.shippedItems}
                                moneyEarned={playerData.moneyEarned}
                                museumCollection={playerData.museumCollection}
                                questsDone={playerData.questsDone}
                                specialReq={playerData.specialRequests}
                                //pendingSpecialReq={playerData.pendingSpecialRequests}
                            ></Achievements> 
                            </>
                        </section>
                    </TabPanel>
                    {playerStats}
                </Tabs>) : <p>No player data available.</p>
                            }
            </section>
        </div>
    );
};

export default Stats;
