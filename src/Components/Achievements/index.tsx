import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';  
import {
    TabCook,
    TabCraft,
    TabCrops,
    TabFishing,
    TabFriendship,
    TabGuild,
    TabItems,
    TabMoney,
    TabMuseum,
    TabQuests,
    TabGrandpa,
} from '@media/Tabs'
import Star from '../../Media/Star.png'
import {
    Collection,
    Earnings,
    Shipping,
    Monsters,
    Friendship,
    Fish,
    Cooking,
    Crafting,
    Crops,
} from '../AchieveTabs';
import type { fullPlayerDataType } from 'types/displayDataTypes.js';

type ControlledTabsProps = {
    achievementsTabIndex?: number;
    onAchievementsTabSelect?: (index: number) => void;
};

const Achievements = ({
    playerName,
    farmName,
    experience,
    moneyEarned,
    professions,
    shippedItems,
    cropsShipped,
    cookingData,
    museumCollection,
    availableSpecialRequests,
    fishCaught,
    friendship,
    itemsCrafted,
    monstersKilled,
    questsDone,
    specialRequests,
    tailoredItems,
    achievementsTabIndex,
    onAchievementsTabSelect,
    }: fullPlayerDataType & ControlledTabsProps ) => {
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

    const tabsProps =
        typeof achievementsTabIndex === 'number' && typeof onAchievementsTabSelect === 'function'
            ? { selectedIndex: achievementsTabIndex, onSelect: onAchievementsTabSelect }
            : {};

    return ( 
        <div className="file-container">
        <img className="star" alt="star" src={Star}></img>
            <Tabs {...tabsProps}>
                <TabList className="achievement">                       
                    {TabImg.map((img, i) => 
                        <Tab key={i}>
                            <img src={img.img} alt={img.alt} title={img.alt} className="tab-ico" />
                        </Tab>
                    )}
                </TabList>
            <TabPanel> 
                <section className="achievement-container"> 
                    <Cooking {...cookingData} ></Cooking>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">  
                    <Crafting {...itemsCrafted}></Crafting>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Crops {...cropsShipped} />
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Fish {...fishCaught} />
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Friendship {...friendship}/>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Monsters {...monstersKilled}/>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Shipping {...shippedItems}/>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Earnings {...moneyEarned}/>
                </section>
            </TabPanel> 
            <TabPanel> 
                <section className="achievement-container">
                    <Collection {...museumCollection} />
                </section>
            </TabPanel> 
            {/* Additional panels (e.g., Quests) can be added here when needed */}
            </Tabs>
        </div>
    );
};

export default Achievements;
