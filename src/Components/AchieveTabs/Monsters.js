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
                <li>
                    <span className="goal-mg">{monsters.images.map((image, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${image.img}.png`} className="done" title={image.name} alt={image.name} ></img>) }</span>
        {monsters.category}: {(monsters.timesKilled >= monsters.goal) ?  <span className="completed"> {monsters.timesKilled} / {monsters.goal}</span> : <span className="pending"> {monsters.timesKilled} / {monsters.goal}</span> } 
                </li>    
        )
    }

    render() {
        return ( 
            <div className="progress-container-flex">  
            
            <span className="a-title"><h1>Adventurer's Guild</h1></span>
                <br />
                <p>Monsters from the Quarry Mine are not being showed, neither are the armored bugs which you can't kill.</p>
                <br />
                <br />
                <h2 className="title-center">Monster Eradication Goals</h2>
                <br />
                <ul className="m-List"> 
                    { this.state.monstersKilled.slice(0, 5).map( m => this.GetQuestData(m))} 
                </ul>
                <ul className="m-List">
                    { this.state.monstersKilled.slice(5).map( m => this.GetQuestData(m))} 
                </ul> 
                {/*this.state.monstersKilled.specificMonsters.map((monster, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${monster.image}.png`} className={monster.data === undefined ? "" : "done"} title={monster.name} alt={monster.name} ></img>)*/}
            </div>
        );
    }
}

export default Monsters;
