import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; 
//import itemList from '../Utility/items.json';
//import {GetItemNames, GetArtifactNames} from '../Utility/Utility'; 
import Food from '../AchieveTabs/Food'
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
import Star from '../../Media/Star.png'

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
                {img:AchQuests, alt: "Quests"}]
        }
    }

    render() {
        return ( 
            <div className="file-container">
            <img className="star" alt="star" src={Star}></img>
                <Tabs>
                    <TabList className="achievement">                       
                        {this.state.achievementImg.map( (img, i) => <Tab key={i}> <img src={img.img} alt={img.alt} className="tab-ico"></img></Tab> )}
                    </TabList> 
                        
                <TabPanel> 
                    <section className="achievement-container"> 
                    <Food recipesCooked={this.props.recipesCooked}></Food>
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">  s
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        d
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        f
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        g
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        h
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        j
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        k
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container">
                        l
                    </section>
                </TabPanel> 
                <TabPanel> 
                    <section className="achievement-container"> 
                        m
                    </section>
                </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default Achievements;
 