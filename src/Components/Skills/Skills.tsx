import { useState } from 'react'
import SkillContainer from './SkillContainer/SkillContainer'
import {Farming, Mining, Foraging, Fishing, Combat} from '@media/Skills'
import type { experienceType } from 'types/displayDataTypes'

const Skills = (experience: experienceType[]) => {
    const skillImg =[Farming, Fishing, Foraging, Mining, Combat];
    console.log("Skills data:", experience);
        return (
            <section className="stats-container"> 
                <div className="skill-info"> 
                    {experience.map((item, i: number) => (i === 5) ? "" :  
                    <SkillContainer 
                        key={i} 
                        index={i} 
                        skillImg={skillImg[i] || ""} 
                        skillName={item.skill} 
                        xp={item.xp} 
                        levelInfo={item.levelInfo}
                    />)}         
                </div>
            </section>
        );
}

export default Skills;
