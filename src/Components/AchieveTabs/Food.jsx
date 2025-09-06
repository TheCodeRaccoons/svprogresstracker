import React from 'react' 
 
class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Dishes: [],
            DishesCooked: 0
        }
    }  
 
    UNSAFE_componentWillMount() { 
        this.setState({
            DishesCooked: this.props.recipesCooked.map((num) => (num.times !== undefined && num.times > 0) ? 1 : 0 ).reduce((n, next) => n + next )
        }) 
    }

    render() {
        return ( 
            <div className="progress-container">   
                <span className="a-title"><h1>You have cooked {this.props.recipesCooked.map((num) => (num.times !== undefined && num.times > 0) ? 1 : 0 ).reduce((n, next) => n + next )}, knowing {this.props.recipesCooked.map((num) => (num.times !== undefined && num.times >= 0) ? 1 : 0 ).reduce((n, next) => n + next )} out of {this.props.recipesCooked.length} recipes</h1></span>
                <br />
                <h2>Cooking Achievements</h2>
                <ul className="a-List"> 
                    <li>Cook: {(this.state.DishesCooked >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to cook {10 - this.state.DishesCooked} more dishes to get this</span> } </li>
                    <li>Sous Chef:  {(this.state.DishesCooked >= 25) ? <span className="completed">You have this achievement</span> : <span className="pending"> You need to cook {25 - this.state.DishesCooked} more dishes to get this</span> }</li>
                    <li>Gourmet Chef: {(this.state.DishesCooked >= 74) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to cook {74 - this.state.DishesCooked} more dishes to get this</span> }</li>
                </ul>
                <br />
                {this.props.recipesCooked.map((d, i) => <a href={`https://stardewvalleywiki.com/${d.link}`} target="blank" key={i}><img src={`https://stardew-tracker.s3.amazonaws.com/Cooking/${d.image}.png`} alt={d.name} className={ (d.times !== undefined) ? ((d.times > 0) ? "done" : "known" ): "" } title={(d.times !== undefined) ? (d.times > 0) ? `Cooked ${d.name}  ${d.times} times` : `You haven't cooked ${d.name}` : `You don't know how to cook ${d.name}`} ></img></a>)}
            </div>
        );
    }
}

export default Food;
