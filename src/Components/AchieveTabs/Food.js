import React from 'react' 
 
class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Dishes: [],
        }
    }  
 
    componentDidMount() {  
    }

    render() {
        return ( 
            <div className="progress-container">  
                <span className="a-title"><h1>Cooked {/*Array.isArray(this.props.recipesCooked) ? this.props.recipesCooked.length : (this.props.recipesCooked) ? 1 : 0} / {this.state.Dishes.length*/} recipes</h1></span>
                {this.props.recipesCooked.map((d, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Cooking/${d.image}.png`} alt={d.name} className={ (d.times !== undefined) ? ((d.times > 0) ? "done" : "known" ): "" } title={(d.times) ? `Cooked ${d.name}  ${d.times} times` : `You haven't cooked ${d.name} yet`} ></img>)}
            </div>
        );
    }
}

export default Food;
