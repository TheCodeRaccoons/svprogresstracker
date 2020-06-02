import React from 'react'
import {GetKnownRecipes} from '../Utility/Utility'
import CraftingRec from '../Utility/CraftingRecipes.json'
 
class Crafting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Items: [],

            //images: [Fried_Egg,Omelet,Salad,Cheese_Cauliflower,Baked_Fish,Parsnip_Soup,Vegetable_Medley,Complete_Breakfast,Fried_Calamari,Strange_Bun,Lucky_Lunch,Fried_Mushroom,Pizza,Bean_Hotpot,Glazed_Yams,Carp_Surprise,Hashbrowns,Pancakes,Salmon_Dinner,Fish_Taco,Crispy_Bass,Pepper_Poppers,Bread,Tom_Kha_Soup,Trout_Soup,Chocolate_Cake,Pink_Cake,Rhubarb_Pie,Cookie,Spaghetti,Fried_Eel,Spicy_Eel,Sashimi,Maki_Roll,Tortilla,Red_Plate,Eggplant_Parmesan,Rice_Pudding,Ice_Cream,Blueberry_Tart,Autumns_Bounty,Pumpkin_Soup,Super_Meal,Cranberry_Sauce,Stuffing,Farmers_Lunch,Survival_Burger,Dish_o_The_Sea,Miners_Treat,Roots_Platter,Triple_Shot_Espresso,Seafoam_Pudding,Algae_Soup,Pale_Broth,Plum_Pudding,Artichoke_Dip,Stir_Fry,Roasted_Hazelnuts,Pumpkin_Pie,Radish_Salad,Fruit_Salad,Blackberry_Cobbler,Cranberry_Candy,Bruschetta,Coleslaw,Fiddlehead_Risotto,Poppyseed_Muffin,Chowder,Fish_Stew,Escargot,Lobster_Bisque,Maple_Bar,Crab_Cakes,Shrimp_Cocktail]
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
