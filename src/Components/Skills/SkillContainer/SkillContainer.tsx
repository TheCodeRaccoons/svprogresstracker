import React from 'react';
class Skills extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return ( 
            <div className="skill-container"> 
                    <h1>{`${this.props.skillName} lvl ${(this.props.xp > this.props.levelInfo.val) ? this.props.levelInfo.id :  this.props.levelInfo.id - 1} `}</h1>
                    <span>
                        Current XP: {this.props.xp} <br />
                        Level Up in: { (this.props.xp > 15000) ? 0 : (this.props.levelInfo.val - this.props.xp)}<br />
                        Max level in: { (this.props.xp > 15000) ? "Maxed" : 15000 - this.props.xp}
                    </span>
                    <img src={this.props.skillImg} alt={this.props.index} ></img>
            </div>
        );
    }
}

export default Skills;

