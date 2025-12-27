import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Skills from '@components/Skills';
import Achievements from '@components/Achievements';
import {
    Junimo1,
    Junimo2,
    Junimo3,
    Junimo4,
    Junimo5 ,
    Junimo6 ,
    Junimo7 ,
    Junimo8
} from '@media/Junimos'
import Rope from '@media/Rope.png'
import type { formattedSaveFileType } from 'types/displayDataTypes';

const Stats = ({playerData, farmName, farmhandData}: formattedSaveFileType) => {
    const [globalFarmName] = useState(farmName || "My Farm");
    // Preserve inner Achievements tab across player switches
    const [achievementsTabIndex, setAchievementsTabIndex] = useState(0);
    const [junimos] = useState([
    Junimo1,
    Junimo2,
    Junimo3,
    Junimo4,
    Junimo5 ,
    Junimo6 ,
    Junimo7 ,
    Junimo8]);

    const titles = farmhandData.map((item, i) => 
        <Tab key={i}>
            <img src={junimos[i + 1]} alt="player nametag"></img> {item.playerName}
        </Tab>
    );
    const playerStats = farmhandData.map((p, i) => (
        <TabPanel key={i}>
            <section className="wrapper">
                <Skills experience={p.experience}></Skills>
                <div className="ropes">
                    <img src={Rope} alt=""></img>
                    <img src={Rope} alt=""></img>
                </div>
                <Achievements
                    {...p}
                    achievementsTabIndex={achievementsTabIndex}
                    onAchievementsTabSelect={setAchievementsTabIndex}
                />
            </section> 
        </TabPanel>
    ));
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
                                {...playerData}
                                achievementsTabIndex={achievementsTabIndex}
                                onAchievementsTabSelect={setAchievementsTabIndex}
                            />
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
