import { useState } from 'react'
import SkillContainer from './SkillContainer/SkillContainer.tsx'
import {Farming, Mining, Foraging, Fishing, Combat} from '@media/Skills'
import type { experienceType } from 'types/displayDataTypes'
import './Skills.css'

interface SkillsProps {
    experience: experienceType[];
}

const Skills = ({ experience }: SkillsProps) => {
    const skillImg =[Farming, Fishing, Foraging, Mining, Combat];
    console.log("Skills data:", experience);
        return (
            <section className="stats-container"> 
                <div className="section-title">
                    <h2>Skills</h2>
                </div>
                <div className="skill-info"> 
                    {experience.map((item, i: number) => (i === 5) ? "" :  
                    <SkillContainer 
                        key={i} 
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
