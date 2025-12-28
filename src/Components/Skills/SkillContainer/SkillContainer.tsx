import type { experienceType, professionsType } from 'types/displayDataTypes';
import './SkillContainer.css';
import {CombatMastery, ForagingMastery, FarmingMastery, MiningMastery, FishingMastery} from '@media/Masteries';

type SkillImgType = {
    skillImg: string;
}

const Skills = ({
    skillImg,
    skill,
    xp,
    levelInfo,
    selectedProfession
}: experienceType & SkillImgType) => {
    const currentLevel = (xp >= levelInfo.val) ? levelInfo.id : levelInfo.id - 1;
    let lvl5Proffession: professionsType | undefined | null = null;
    let lvl10Proffession: professionsType | undefined | null = null;
    if (selectedProfession && selectedProfession.length > 0) {
        lvl5Proffession = selectedProfession.find(prof => prof.level === 5);
    }
    if (selectedProfession && selectedProfession.length > 0) {
        lvl10Proffession = selectedProfession.find(prof => prof.level === 10);
    }
    return (
    <div className="skill-container">
            <div className='skill-container__item'>
                <span>{`${skill}`}</span>
                <img 
                    src={skillImg} 
                    alt={skill}
                    title={`${skill} - Level ${currentLevel}`}
                    className='skill-container__icon'
                />
                <div className='skill-container__level-indicators' >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            role="presentation"
                            className={`skill-container__level-block ${index === 4 || index === 9 ? 
                                'lg' : 'sm'} 
                                ${currentLevel > index ? 'active' : ''}`}
                            title={index === 4 && lvl5Proffession ? 
                                `${lvl5Proffession.name}, ${lvl5Proffession?.description}` : 
                                index === 9 && lvl10Proffession ?
                                `${lvl10Proffession.name}, ${lvl10Proffession?.description}` : 
                                ''}
                        />
                    ))}
                </div>
                <span className='skill-container__level-no'>{`${currentLevel}`}</span>
            </div>
        </div>
    )
};

export default Skills;
