import React from 'react'  
import ActiveH from '../../Media/Heart_active.png'
import InactiveH from '../../Media/Heart_disabled.png'
class Friendship extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            Friendship: this.props.friendship
        }
    }
    displayHearts = (numHearts) => {
        let hearts = []
        for(let i = 0; i < 10; i++){ 
            hearts.push(<img key={i} src={(i < numHearts) ? ActiveH : InactiveH } alt={(i <= numHearts) ? "owned":"missing"} width="18"></img>)
        }
        return hearts;        
    }

    GetFriendAcchievements = () => {
        let totalFive = 0
        let totalTen = 0
        this.state.Friendship.forEach(el => { 
            if(el.level >= 5){
                totalFive += 1;
            } 
            if(el.level >= 10){
                totalTen += 1;
            } 
        }); 

        this.setState({
            five: totalFive,
            ten: totalTen
        }) 
    }


    componentDidMount() {   
        this.GetFriendAcchievements();
    } 

    render() {
        return ( 
            <div className="progress-container-flex">    

                <h2>Friendship Achievements</h2>
                    <ul className="a-List"> 
                        <li>A New Friend: {(this.state.five >= 1) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {1 - this.state.five} Villagers</span> } </li>
                        <li>Cliques:  {(this.state.five >= 4) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {4 - this.state.five} Villagers </span>}</li>
                        <li>Networking : {(this.state.five >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {10 - this.state.five} Villagers </span>}</li>
                        <li>Popular: {(this.state.five >= 20) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {20 - this.state.five} Villagers </span>}</li>
                        <li>Best Friends: {(this.state.ten >= 1) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {1 - this.state.ten} Villagers </span>} </li>
                        <li>The Beloved Farmer:  {(this.state.ten >= 8) ? <span className="completed">You have this achievement</span> : <span className="pending"> You need to increase your friendship with {8 - this.state.ten} Villagers </span> }</li>
                        <li>Introductions quest: TBD </li>
                    </ul>

                {this.state.Friendship.map((d, i) => 
                    <div className="npc-data"  key={i}>
                        <h2>{d.name}</h2>
                        <img className="friendship" src={`https://stardew-tracker.s3.amazonaws.com/Friendship/${d.name}.png`} alt={d.name} title={(d.lvlup > 10) ? `You have ${d.level} hearts with this npc` : (d.dateable && d.level === 8) ? `You need to start a relationship with ${d.name} to increase your friendship level`  :`you need ${d.lvlup} points to level up`} ></img>
                        {this.displayHearts(d.level)}
                    </div>
                        
                )}
            </div>
        );
    }
}

export default Friendship;
