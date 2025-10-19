import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';  
import Food from '../AchieveTabs/Cooking'
import Crafting from '../AchieveTabs/Crafting'
import { TabCook, TabCraft, TabCrops, TabFishing, TabFriendship, TabGuild, TabItems, TabMoney, TabMuseum, TabQuests, TabGrandpa } from '@media/Tabs'
import Star from '../../Media/Star.png'
import Crops from '../AchieveTabs/Crops';
import Fish from '../AchieveTabs/Fish';
import Friendship from '../AchieveTabs/Friendship';
import Monsters from '../AchieveTabs/Monsters';
import Shipping from '../AchieveTabs/Shipping'
import Earnings from '../AchieveTabs/moneyEarned'
import Collection from '../AchieveTabs/Collection'
import Quests from '../AchieveTabs/quests'
import type { fullPlayerDataType } from 'types/displayDataTypes.js';

const Achievements = ({
    playerName,
    farmName,
    experience,
    moneyEarned,
    professions,
    shippedItems,
    cropsShipped,
    mineralsFound,
    cookedItems,
    museumCollection,
    availableSpecialRequests,
    fishCaught,
    friendship,
    itemsCrafted,
    monstersKilled,
    questsDone,
    specialRequests,
    tailoredItems,
    }: fullPlayerDataType ) => {
    const TabImg = [
        {img: TabCook, alt: "Cooking"}, 
        {img: TabCraft, alt: "Crafting"}, 
        {img: TabCrops, alt: "Crops"}, 
        {img: TabFishing, alt: "Fishing"}, 
        {img: TabFriendship, alt: "Friendship"}, 
        {img: TabGuild, alt: "Guild"}, 
        {img: TabItems, alt: "Items"}, 
        {img: TabMoney, alt: "Money"}, 
        {img: TabMuseum, alt: "Museum"}, 
        {img: TabQuests, alt: "Quests"}, 
        {img: TabGrandpa, alt: "Grandpa's evaluation"}
    ];

    return ( 
        <div className="file-container">
        <img className="star" alt="star" src={Star}></img>
            <Tabs>
                <TabList className="achievement">                       
                    {TabImg.map((img, i) => <Tab key={i}> <img src={img.img} alt={img.alt} title={img.alt} className="tab-ico"></img></Tab>)}
                </TabList>
            <TabPanel> 
                <section className="achievement-container"> 
                    <Food recipesCooked={cookedItems}></Food>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">  
                    <Crafting itemsCrafted={itemsCrafted}></Crafting>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Crops cropsShipped={cropsShipped} />
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Fish fishCaught={fishCaught} />
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Friendship friendship={friendship}/>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Monsters monstersKilled={monstersKilled}/>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Shipping shippedItems={shippedItems}/>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Earnings moneyEarned={moneyEarned}/>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Collection museumCollection={museumCollection} />
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container"> 
                    <Quests questsDone={questsDone} specialReq={specialRequests} pendingSpecialReq={pendingSpecialReq} />
                </section>
            </TabPanel>
            <TabPanel> 
                <section className="achievement-container"> 
                    <Quests questsDone={questsDone} specialReq={specialRequests} pendingSpecialReq={pendingSpecialReq} />
                </section>
            </TabPanel>
            </Tabs>
        </div>
    );
};

export default Achievements;
