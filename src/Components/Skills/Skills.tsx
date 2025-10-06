import { useState } from 'react'
import SkillContainer from './SkillContainer/SkillContainer'
import {Farming, Mining, Foraging, Fishing, Combat} from '@media/Skills'

const Skills = (props) => {
    console.log(props)
    let [skills, setSkills] = useState(props.xp)
    let [skillImg, setSkillImg] = useState([Farming, Fishing, Foraging, Mining, Combat])

        return (
            <section className="stats-container"> 
                <div className="skill-info"> 
                    {skills.map((item, i: number) => (i === 5) ? "" :  
                    <SkillContainer 
                        key={i} 
                        index={i} 
                        skillImg={skillImg[i]} 
                        skillName={item.skill} 
                        xp={item.xp} 
                        levelInfo={item.levelInfo}
                    />)}         
                </div>
            </section>
        );
}

export default Skills;
