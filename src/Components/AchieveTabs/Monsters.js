import React from 'react' 
 
class Monsters extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            monstersKilled: this.props.monstersKilled
        }
    }  

    GetGuildKills = (items) => {
        return items.map((num) => (num.times !== undefined && num.times > 0 && num.name !== "Wedding Ring") ? 1 : 0).reduce((n, next) => next + n)
    }

    componentWillMount() { 
        //this.setState({totalCrafted: this.GetCraftedItems(this.state.itemsCrafted)})
    }

    render() {
        return ( 
            <div className="progress-container">  
             
             <span className="a-title"><h1>Adventurer's Guild</h1></span>
                <p>Monsters from the Quarry Mine are not being showed, neither are the armored bugs which you can't kill.</p>
                <br />
                <h2>Monster Eradication Goals</h2>
                <ul className="a-List"> 
                    <li>Slimes: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Void Spirits: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Bats: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Skeleton: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Cave Insects: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Duggy: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Dust Sprite: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Rock Crabs: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Mummy: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Pepper Rex: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                    <li>Serpent: {(this.state.monstersKilled.slimesKilled >= 1000) ?  <span className="completed"> {this.state.monstersKilled.slimesKilled} / 1000</span> : <span className="pending"> {this.state.monstersKilled.slimesKilled} / 1000</span> } </li>
                </ul>
                <br />
                {this.state.monstersKilled.specificMonsters.map((monster, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${monster.image}.png`} className={monster.data === undefined ? "" : "done"} title={monster.name} alt={monster.name} ></img>)}
            </div>
        );
    }
}

export default Monsters;
