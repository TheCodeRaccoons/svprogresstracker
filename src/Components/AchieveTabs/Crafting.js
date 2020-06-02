import React from 'react'
import {GetKnownRecipes} from '../Utility/Utility'
import CraftingRec from '../Utility/CraftingRecipes.json'
 
class Crafting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Items: [],
        }
    }  

    getRecipes(){ 
        this.setState({Items: GetKnownRecipes(this.props.itemsCrafted, CraftingRec.recipes)})
    }
    
    componentDidMount() {
        this.getRecipes()
    }

    render() {
        return ( 
            <div className="progress-container"> 
                <span className="a-title"><h1>has crafted {""} and knows 104 of {CraftingRec.recipes.length} recipes.</h1></span>
                {this.state.Items.map((item, i) => (
                <img 
                    key={i} 
                    src={`https://stardew-tracker.s3.amazonaws.com/Crafting/${item.img}.png`} 
                    alt={item.Name} 
                    className={(item.times !== undefined) ? ((parseInt(item.times.times) > 0) ? "done" : "known") : "" } 
                    title={(item.times !== undefined) ? ((item.times.times) ? ((item.times.times !== "0") ? `You have crafted ${item.Name} ${item.times.times} Times` : `You know how to craft ${item.Name}`) : `You don't know how to craft ${item.Name} yet` ) : `You don't know how to craft ${item.Name} yet`}>
                    </img>))}
            </div>
        );
    }
}

export default Crafting;
