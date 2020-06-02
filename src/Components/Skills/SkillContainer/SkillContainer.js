import React from 'react';    
import {GetSkillName, GetLevelInfo} from '../../Utility/Utility'
class Skills extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return ( 
            <div className="skill-container"> 
                    <h1>{GetSkillName(this.props.index)}</h1>
                    <span>
                        Current XP: {this.props.xp} <br />
                        Level Up in: {(GetLevelInfo(this.props.xp, this.props.levelList.Levels))}<br />
                        Max level in: { (this.props.xp > 15000) ? 0 : 15000 - this.props.xp}
                    </span>
                    <img src={this.props.skillImg} alt={this.props.index} ></img>
            </div>
        );
    }
}

export default Skills;

