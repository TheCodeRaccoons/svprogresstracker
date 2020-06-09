import React from 'react' 
 
class Crafting extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            itemsCrafted: this.props.itemsCrafted
        }
    }  

    GetCraftedItems = (items) => {
        return items.map((num) => (num.times !== undefined && num.times > 0 && num.name !== "Wedding Ring") ? 1 : 0).reduce((n, next) => next + n)
    }

    componentWillMount() { 
        this.setState({totalCrafted: this.GetCraftedItems(this.state.itemsCrafted)})
    }

    render() {
        return ( 
            <div className="progress-container"> 
                <span className="a-title"><h1>has crafted {this.props.itemsCrafted.map((num) => (num.times !== undefined && num.times > 0) ? 1 : 0).reduce((n, next) => next + n)} and knows {this.props.itemsCrafted.map((num) => (num.times !== undefined && num.times >= 0) ? 1 : 0).reduce((n, next) => next + n)} of {this.props.itemsCrafted.length} recipes.</h1></span>
                <br />
                <h2>Crafting Achievements</h2>
                <ul className="a-List"> 
                    <li>D.I.Y.: {(this.state.totalCrafted >= 15) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to craft {15 - this.state.totalCrafted} more items to get this</span> } </li>
                    <li>Artisan: {(this.state.totalCrafted >= 30) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to craft {30 - this.state.totalCrafted} more items to get this </span>}</li>
                    <li>Craft Master: {(this.state.totalCrafted >= 104) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to craft {104 - this.state.totalCrafted} more items to get this </span>}</li>
                </ul>
                <br />
                {this.props.itemsCrafted.map((item, i) => (
                <img 
                    key={i} 
                    src={`https://stardew-tracker.s3.amazonaws.com/Crafting/${item.image}.png`} 
                    alt={item.Name} 
                    className={(item.times !== undefined) ? ((item.times > 0) ? "done" : "known") : "" } 
                    title={(item.times !== undefined) ? ((item.times > 0) ? `You have crafted "${item.name}" ${item.times} Times` : `You haven't crafted any ${item.name} yet`) : `You don't know how to craft ${item.name} yet`}>
                    </img>))}
            </div>
        );
    }
}

export default Crafting;
