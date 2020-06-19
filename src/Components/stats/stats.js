import React from 'react';
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

class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            farmName: this.props.farmName,
            junimos: [Junimo1,Junimo2,Junimo3, Junimo4],
            Activejunimos: [Junimo1a,Junimo2a,Junimo3a, Junimo4a]
        }
    }

    render() {

const titles = this.props.farmhands.map((item, i) =><Tab key={i}> <img src={this.state.junimos[i + 1]} alt="Jun"></img> {item.playerName}</Tab>)
const playerStats = this.props.farmhands.map((item, i) =>(
<TabPanel key={i}>
    <section className="wrapper">
    <Skills xp={item.experience} ></Skills>
        <div className="ropes">
            <img src={Rope} alt="" ></img>
            <img src={Rope} alt="" ></img>
        </div>
        <Achievements 
        recipesCooked={item.recipesCooked}
        itemsCrafted={item.itemsCrafted}  
        cropsShipped={item.cropsShipped} 
        fishCaught = {item.fishCaught}
        friendship = {item.friendship}
        friendship = {item.monstersKilled}
        ></Achievements>
    </section> 
</TabPanel>) 
)

        return ( 
            <div className="file-container">  
                <div className="farmName"><h2>Farm: {this.props.playerData.farmName}</h2></div> 
                <section className="scroller"> 
                <Tabs>
                    <TabList> 
                        <Tab><img src={this.state.junimos[0]} alt="Junimo" width="25px"></img>{this.props.playerData.playerName}</Tab>
                        {titles}
                    </TabList>
                
                    <TabPanel> <section className="wrapper">
                        <Skills xp={this.props.playerData.experience} ></Skills>
                        <div className="ropes">
                            <img src={Rope} alt="" ></img>
                            <img src={Rope} alt="" ></img>
                        </div> 
                        <Achievements 
                            recipesCooked={this.props.playerData.recipesCooked} 
                            itemsCrafted={this.props.playerData.itemsCrafted}  
                            cropsShipped={this.props.playerData.cropsShipped}  
                            fishCaught = {this.props.playerData.fishCaught}
                            friendship = {this.props.playerData.friendship}
                            monstersKilled = {this.props.playerData.monstersKilled}
                        ></Achievements>
                        </section>
                    </TabPanel>
                        {playerStats}
                </Tabs>
                </section>
            </div>
        );
    }
}

export default Stats;
