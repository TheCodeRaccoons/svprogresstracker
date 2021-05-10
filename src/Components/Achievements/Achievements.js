import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';  
import Food from '../AchieveTabs/Food'
import Crafting from '../AchieveTabs/Crafting'
import AchCook from '../../Media/Achievements/AchCook.png'
import AchCraft from '../../Media/Achievements/AchCraft.png'
import AchCrops from '../../Media/Achievements/AchCrops.png'
import AchFishing from '../../Media/Achievements/AchFishing.png'
import AchFriendship from '../../Media/Achievements/AchFriendship.png' 
import AchGuild from '../../Media/Achievements/AchGuild.png'
import AchItems from '../../Media/Achievements/AchItems.png'
import AchMoney from '../../Media/Achievements/AchMoney.png'
import AchMuseum from '../../Media/Achievements/AchMuseum.png'
import AchQuests from '../../Media/Achievements/AchQuests.png'
import AchGrandpa from '../../Media/Achievements/AchGrandpa.png'
import Star from '../../Media/Star.png'
import Crops from '../AchieveTabs/Crops';
import Fish from '../AchieveTabs/Fish';
import Friendship from '../AchieveTabs/Friendship';
import Monsters from '../AchieveTabs/Monsters';
import Shipping from '../AchieveTabs/Shipping'
import Earnings from '../AchieveTabs/moneyEarned'
import Collection from '../AchieveTabs/Collection'
import Quests from '../AchieveTabs/quests' 

class Achievements extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            achievementImg: [
                {img:AchCook, alt: "Cooking"}, 
                {img:AchCraft, alt: "Crafting"}, 
                {img:AchCrops, alt: "Crops"}, 
                {img:AchFishing, alt: "Fishing"}, 
                {img:AchFriendship, alt: "Friendship"}, 
                {img:AchGuild, alt: "Guild"}, 
                {img:AchItems, alt: "Items"}, 
                {img:AchMoney, alt: "Money"}, 
                {img:AchMuseum, alt: "Museum"}, 
                {img:AchQuests, alt: "Quests"}, 
                {img:AchGrandpa, alt: "Grandpa's evaluation"}]
        }
    }

    render() {
        return ( 
            <div className="file-container">
            <img className="star" alt="star" src={Star}></img>
                <Tabs>
                    <TabList className="achievement">                       
                        {this.state.achievementImg.map( (img, i) => <Tab key={i}> <img src={img.img} alt={img.alt} title={img.alt} className="tab-ico"></img></Tab> )}
                    </TabList> 
                        
                <TabPanel> 
                    <section className="achievement-container"> 
                        <Food recipesCooked={this.props.recipesCooked}></Food>
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">  
                        <Crafting itemsCrafted={this.props.itemsCrafted}></Crafting>
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        <Crops cropsShipped = {this.props.cropsShipped} />
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        <Fish fishCaught = {this.props.fishCaught} />
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        <Friendship friendship={this.props.friendship}/>
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        <Monsters monstersKilled={this.props.monstersKilled}/>
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        <Shipping shippedItems={this.props.shippedItems}/>
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        <Earnings moneyEarned={this.props.moneyEarned}/>
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        <Collection museumCollection={this.props.museumCollection} />
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container"> 
                        <Quests questsDone={this.props.questsDone} specialReq={this.props.specialReq} pendingSpecialReq={this.props.pendingSpecialReq} />
                    </section>
                </TabPanel>
                <TabPanel> 
                    <section className="achievement-container"> 
                        <Quests questsDone={this.props.questsDone} specialReq={this.props.specialReq} pendingSpecialReq={this.props.pendingSpecialReq} />
                    </section>
                </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default Achievements;
 