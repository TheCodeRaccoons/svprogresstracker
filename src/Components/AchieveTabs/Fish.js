import React from 'react'  

class Fish extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fishCaught: this.props.fishCaught,
            totalFished: 0
        }
    }  
    
    GetCraftedItems = (items) => {
        return items.map((num) => (num.fished) ? 1 : 0).reduce((n, next) => next + n)
    }
    
    componentWillMount() {  
        this.setState({
            totalFished: this.GetCraftedItems(this.state.fishCaught)
        })
    } 
    render() {
        return ( 
            <div className="progress-container">  
                <span className="a-title"><h1>{ `You've fished ${this.state.totalFished} out of ${this.state.fishCaught.length}`}</h1></span>
                <br />
                <h2>Fishing Achievements</h2>
                <ul className="a-List"> 
                    <li>Fisherman: {(this.state.totalFished >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to catch {15 - this.state.totalFished} more fish to get this</span> } </li>
                    <li>Ol' Mariner: {(this.state.totalFished >= 24) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to catch {30 - this.state.totalFished} more fish to get this </span>}</li>
                    <li>Craft Master: {(this.state.totalFished >= this.state.fishCaught.length) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to catch {this.state.fishCaught.length - this.state.totalFished} more fish to get this </span>}</li>
                </ul>
                <br />
                {this.state.fishCaught.map((fish, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Fishing/${fish.image}.png`} alt={fish.name} className={ (fish.fished) ? "done" : ""} title={(fish.fished) ? `You've caught  ${fish.name}` :  `You haven't fished ${fish.name}`} ></img>)}

            </div>
        );
    }
}

export default Fish;
