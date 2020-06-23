import React from 'react' 
 
class Shipping extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            shippedItems: this.props.shippedItems
            
        }
    }  


    GetAcchievements = () => {
        let total = 0 
        this.state.shippedItems.forEach(el => { 
            if((el.shipped !== undefined)){
                total += 1;
            }  
        }); 

        this.setState({
            totalShipped: total 
        }) 
    }

    componentDidMount = () => {
        this.GetAcchievements()
    }

    render() {
        return ( 
            <div className="progress-container">   
                <span className="a-title"><h1>You have shipped {this.state.totalShipped} / {this.state.shippedItems.length} items.</h1></span>
                <br />
                <h2>Shipping Achievements</h2>
                <ul className="a-List"> 
                    <li>Full Shipment: {(this.state.totalShipped === this.state.shippedItems.length) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to ship {this.state.shippedItems.length - this.state.totalShipped} more item to get this achievement.</span> } </li>
                </ul>
                <br />
                {this.props.shippedItems.map((d, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Shipment/${d.image}.png`} alt={d.name} className={ (d.shipped !== undefined) ?  "done" : "" } title={(d.shipped !== undefined) ? `You have shipped ${d.name}` : `You haven't shipped ${d.name}`} ></img>)}
            </div>
        );
    }
}

export default Shipping;
