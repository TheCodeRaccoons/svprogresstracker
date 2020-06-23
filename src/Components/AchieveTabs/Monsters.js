import React from 'react' 
 
class Monsters extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            monstersKilled: this.props.monstersKilled
        }
    }  
 
    GetQuestData = (monsters) => {
        return(
                <li key={monsters.goal}>
                    <span className="goal-mg">{monsters.images.map((image, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${image.img}.png`} className="done" title={image.name} alt={image.name} width="21px" ></img>) }</span>
        {monsters.category}: {(monsters.timesKilled >= monsters.goal) ?  <span className="completed"> {monsters.timesKilled} / {monsters.goal}</span> : <span className="pending"> {monsters.timesKilled} / {monsters.goal}</span> } 
                </li>    
        )
    }

    render() {
        return ( 
            <div className="progress-container-flex">  
            
            <span className="a-title"><h1>Monster Eradication Goals</h1></span>
                <br /> 
                <br />
                <ul className="m-List"> 
                    { this.state.monstersKilled.slice(0, 5).map( m => this.GetQuestData(m))} 
                </ul>
                <ul className="m-List">
                    { this.state.monstersKilled.slice(5).map( m => this.GetQuestData(m))} 
                </ul> 
            </div>
        );
    }
}

export default Monsters;
