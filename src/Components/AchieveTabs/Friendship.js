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

    componentWillMount() {   
    } 

    render() {
        return ( 
            <div className="progress-container-friendship">    
                {this.state.Friendship.map((d, i) => 
                    <div className="npc-data"  key={i}>
                        <h2>{d.name}</h2>
                        <img className="friendship" src={`https://stardew-tracker.s3.amazonaws.com/Friendship/${d.name}.png`} alt={d.name} title={(d.lvlup > 10) ? `You have ${d.level} hearts with this npc` : `you need ${d.lvlup} points to level up`} ></img>
                        {this.displayHearts(d.level)}
                    </div>
                        
                )}
            </div>
        );
    }
}

export default Friendship;
