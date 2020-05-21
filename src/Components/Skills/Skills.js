import React from 'react';   
import SkillContainer from './SkillContainer/SkillContainer'
import Fa_img from '../../Media/Skills/Farming.png'
import Mi_img from '../../Media/Skills/Mining.png'
import Fo_img from '../../Media/Skills/Foraging.png'
import Fi_img from '../../Media/Skills/Fishing.png'
import Co_img from '../../Media/Skills/Combat.png'
import levelList from '../Utility/levels.json';
class Skills extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            skillImg: [Fa_img, Fi_img, Fo_img, Mi_img, Co_img], 
            skills: this.props.xp
        }
    }

    render() {
        return (
            <section className="stats-container"> 
                <div className="skill-info"> 
                    {this.state.skills.map((item, i) => (item === "0") ? "" : <SkillContainer key={i} index={i} skillImg={this.state.skillImg[i]} xp={item} levelList={levelList} />)}         
                </div>
            </section>
        );
    }
}

export default Skills;
