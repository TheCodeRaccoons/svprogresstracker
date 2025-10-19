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
import type { fullPlayerDataType } from 'types/displayDataTypes';

type statsPageProps = {
    playerData: fullPlayerDataType;
    globalFarmName: string;
    farmhands: fullPlayerDataType[];
}

const Stats = ({playerData, globalFarmName, farmhands}: statsPageProps) => {
    const [farmName] = useState(globalFarmName || "My Farm");
    const [junimos] = useState([Junimo1, Junimo2, Junimo3, Junimo4]);
    const [Activejunimos] = useState([Junimo1a, Junimo2a, Junimo3a, Junimo4a]);

    const titles = farmhands.map((item, i) => 
        <Tab key={i}>
            <img src={junimos[i + 1]} alt="Jun"></img> {item.playerName}
        </Tab>
    );

    const playerStats = farmhands.map((item, i) => (
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

    return ( 
        <div className="file-container">  
            <div className="farmName"><h2>Farm: {farmName}</h2></div> 
            <section className="scroller"> 
                <Tabs>
                    <TabList> 
                        <Tab><img src={junimos[0]} alt="Junimo" width="25px"></img>{playerData[0].playerName}</Tab>
                        {titles}
                    </TabList>
                
                    <TabPanel>
                        <section className="wrapper">
                            <Skills {...playerData[0].experience}></Skills>
                            <div className="ropes">
                                <img src={Rope} alt=""></img>
                                <img src={Rope} alt=""></img>
                            </div> 
                            <Achievements 
                                recipesCooked={playerData[0].cookedItems} 
                                itemsCrafted={playerData[0].itemsCrafted}  
                                cropsShipped={playerData[0].cropsShipped}  
                                fishCaught={playerData[0].fishCaught}
                                friendship={playerData[0].friendship}
                                monstersKilled={playerData[0].monstersKilled}
                                shippedItems={playerData[0].shippedItems}
                                moneyEarned={playerData[0].moneyEarned}
                                museumCollection={playerData[0].museumCollection}
                                questsDone={playerData[0].questsDone}
                                specialReq={playerData[0].specialRequests}
                                pendingSpecialReq={playerData[0].pendingSpecialRequests}
                            ></Achievements>
                        </section>
                    </TabPanel>
                    {playerStats}
                </Tabs>
            </section>
        </div>
    );
};

export default Stats;
