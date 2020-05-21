import React from 'react'
import Fried_Egg from "../../Media/Dishes/Fried_Egg.png"
import Omelet from "../../Media/Dishes/Omelet.png"
import Salad from "../../Media/Dishes/Salad.png"
import Cheese_Cauliflower from "../../Media/Dishes/Cheese_Cauliflower.png"
import Baked_Fish from "../../Media/Dishes/Baked_Fish.png"
import Parsnip_Soup from "../../Media/Dishes/Parsnip_Soup.png"
import Vegetable_Medley from "../../Media/Dishes/Vegetable_Medley.png"
import Complete_Breakfast from "../../Media/Dishes/Complete_Breakfast.png"
import Fried_Calamari from "../../Media/Dishes/Fried_Calamari.png"
import Strange_Bun from "../../Media/Dishes/Strange_Bun.png"
import Lucky_Lunch from "../../Media/Dishes/Lucky_Lunch.png"
import Fried_Mushroom from "../../Media/Dishes/Fried_Mushroom.png"
import Pizza from "../../Media/Dishes/Pizza.png"
import Bean_Hotpot from "../../Media/Dishes/Bean_Hotpot.png"
import Glazed_Yams from "../../Media/Dishes/Glazed_Yams.png"
import Carp_Surprise from "../../Media/Dishes/Carp_Surprise.png"
import Hashbrowns from "../../Media/Dishes/Hashbrowns.png"
import Pancakes from "../../Media/Dishes/Pancakes.png"
import Salmon_Dinner from "../../Media/Dishes/Salmon_Dinner.png"
import Fish_Taco from "../../Media/Dishes/Fish_Taco.png"
import Crispy_Bass from "../../Media/Dishes/Crispy_Bass.png"
import Pepper_Poppers from "../../Media/Dishes/Pepper_Poppers.png"
import Bread from "../../Media/Dishes/Bread.png"
import Tom_Kha_Soup from "../../Media/Dishes/Tom_Kha_Soup.png"
import Trout_Soup from "../../Media/Dishes/Trout_Soup.png"
import Chocolate_Cake from "../../Media/Dishes/Chocolate_Cake.png"
import Pink_Cake from "../../Media/Dishes/Pink_Cake.png"
import Rhubarb_Pie from "../../Media/Dishes/Rhubarb_Pie.png"
import Cookie from "../../Media/Dishes/Cookie.png"
import Spaghetti from "../../Media/Dishes/Spaghetti.png"
import Fried_Eel from "../../Media/Dishes/Fried_Eel.png"
import Spicy_Eel from "../../Media/Dishes/Spicy_Eel.png"
import Sashimi from "../../Media/Dishes/Sashimi.png"
import Maki_Roll from "../../Media/Dishes/Maki_Roll.png"
import Tortilla from "../../Media/Dishes/Tortilla.png"
import Red_Plate from "../../Media/Dishes/Red_Plate.png"
import Eggplant_Parmesan from "../../Media/Dishes/Eggplant_Parmesan.png"
import Rice_Pudding from "../../Media/Dishes/Rice_Pudding.png"
import Ice_Cream from "../../Media/Dishes/Ice_Cream.png"
import Blueberry_Tart from "../../Media/Dishes/Blueberry_Tart.png"
import Autumns_Bounty from "../../Media/Dishes/Autumn's_Bounty.png"
import Pumpkin_Soup from "../../Media/Dishes/Pumpkin_Soup.png"
import Super_Meal from "../../Media/Dishes/Super_Meal.png"
import Cranberry_Sauce from "../../Media/Dishes/Cranberry_Sauce.png"
import Stuffing from "../../Media/Dishes/Stuffing.png"
import Farmers_Lunch from "../../Media/Dishes/Farmer's_Lunch.png"
import Survival_Burger from "../../Media/Dishes/Survival_Burger.png"
import Dish_o_The_Sea from "../../Media/Dishes/Dish_o'_The_Sea.png"
import Miners_Treat from "../../Media/Dishes/Miner's_Treat.png"
import Roots_Platter from "../../Media/Dishes/Roots_Platter.png"
import Triple_Shot_Espresso from "../../Media/Dishes/Triple_Shot_Espresso.png"
import Seafoam_Pudding from "../../Media/Dishes/Seafoam_Pudding.png"
import Algae_Soup from "../../Media/Dishes/Algae_Soup.png"
import Pale_Broth from "../../Media/Dishes/Pale_Broth.png"
import Plum_Pudding from "../../Media/Dishes/Plum_Pudding.png"
import Artichoke_Dip from "../../Media/Dishes/Artichoke_Dip.png"
import Stir_Fry from "../../Media/Dishes/Stir_Fry.png"
import Roasted_Hazelnuts from "../../Media/Dishes/Roasted_Hazelnuts.png"
import Pumpkin_Pie from "../../Media/Dishes/Pumpkin_Pie.png"
import Radish_Salad from "../../Media/Dishes/Radish_Salad.png"
import Fruit_Salad from "../../Media/Dishes/Fruit_Salad.png"
import Blackberry_Cobbler from "../../Media/Dishes/Blackberry_Cobbler.png"
import Cranberry_Candy from "../../Media/Dishes/Cranberry_Candy.png"
import Bruschetta from "../../Media/Dishes/Bruschetta.png"
import Coleslaw from "../../Media/Dishes/Coleslaw.png"
import Fiddlehead_Risotto from "../../Media/Dishes/Fiddlehead_Risotto.png"
import Poppyseed_Muffin from "../../Media/Dishes/Poppyseed_Muffin.png"
import Chowder from "../../Media/Dishes/Chowder.png"
import Fish_Stew from "../../Media/Dishes/Fish_Stew.png"
import Escargot from "../../Media/Dishes/Escargot.png"
import Lobster_Bisque from "../../Media/Dishes/Lobster_Bisque.png"
import Maple_Bar from "../../Media/Dishes/Maple_Bar.png"
import Crab_Cakes from "../../Media/Dishes/Crab_Cakes.png"
import Shrimp_Cocktail from "../../Media/Dishes/Shrimp_Cocktail.png"
import Dishes from '../Utility/Dishes.json' 
import {getCookedDishes} from '../Utility/Utility'
 
class Food extends React.Component {
    constructor() {
        super()
        this.state = {
            Dishes: [],
            images: [Fried_Egg,Omelet,Salad,Cheese_Cauliflower,Baked_Fish,Parsnip_Soup,Vegetable_Medley,Complete_Breakfast,Fried_Calamari,Strange_Bun,Lucky_Lunch,Fried_Mushroom,Pizza,Bean_Hotpot,Glazed_Yams,Carp_Surprise,Hashbrowns,Pancakes,Salmon_Dinner,Fish_Taco,Crispy_Bass,Pepper_Poppers,Bread,Tom_Kha_Soup,Trout_Soup,Chocolate_Cake,Pink_Cake,Rhubarb_Pie,Cookie,Spaghetti,Fried_Eel,Spicy_Eel,Sashimi,Maki_Roll,Tortilla,Red_Plate,Eggplant_Parmesan,Rice_Pudding,Ice_Cream,Blueberry_Tart,Autumns_Bounty,Pumpkin_Soup,Super_Meal,Cranberry_Sauce,Stuffing,Farmers_Lunch,Survival_Burger,Dish_o_The_Sea,Miners_Treat,Roots_Platter,Triple_Shot_Espresso,Seafoam_Pudding,Algae_Soup,Pale_Broth,Plum_Pudding,Artichoke_Dip,Stir_Fry,Roasted_Hazelnuts,Pumpkin_Pie,Radish_Salad,Fruit_Salad,Blackberry_Cobbler,Cranberry_Candy,Bruschetta,Coleslaw,Fiddlehead_Risotto,Poppyseed_Muffin,Chowder,Fish_Stew,Escargot,Lobster_Bisque,Maple_Bar,Crab_Cakes,Shrimp_Cocktail]
        }
    }  

    getDishes(){
        let dishArr = []
        dishArr = Dishes.Dishes.map((d, i) => {
            return {
                Name:d.Name, 
                id: d.id, 
                img: this.state.images[i]
            }
        })
        this.setState({ Dishes:getCookedDishes(this.props.recipesCooked, dishArr) }) 
    }
    componentDidMount() { 
        this.getDishes()
    }

    render() {
        return ( 
            <div className="food-container"> 
                <span className="a-title"><h1>Cooked {Array.isArray(this.props.recipesCooked) ? this.props.recipesCooked.length : (this.props.recipesCooked) ? 1 : 0} / {this.state.Dishes.length} recipes</h1></span>
                {this.state.Dishes.map((d, i) => <img key={i} src={d.img} alt={d.item} className={(d.times) ? "cooked" : ""} title={(d.times) ? `Cooked ${d.times.times} times` : `You haven't cooked ${d.Name} yet`} ></img>)}
            </div>
        );
    }
}

export default Food;
