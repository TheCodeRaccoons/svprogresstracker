import SkillContainer from './SkillContainer/SkillContainer.tsx'
import {Farming, Mining, Foraging, Fishing, Combat} from '@media/Skills'
import type { experienceType } from 'types/displayDataTypes'
import './Skills.css'

interface SkillsProps {
    experience: experienceType[];
}

const Skills = ({ experience }: SkillsProps) => {
    const skillImg =[Farming, Fishing, Foraging, Mining, Combat];
        return (
            <section className="stats-container"> 
                <div className='character-area'>
                    <div className="character-portrait">

                    </div>
                </div>
                <div className="skill-info">
                    {experience.map((item, i: number) => (i === 5) ? "" :  
                    <SkillContainer 
                        key={i} 
                        skillImg={skillImg[i] || ""} {...item}
                    />)}         
                </div>
            </section>
        );
}

export default Skills;
