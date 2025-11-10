import './SkillContainer.css';
import {CombatMastery, ForagingMastery, FarmingMastery, MiningMastery, FishingMastery} from '@media/Masteries';

type SkillProps = {
    skillImg: string;
    skillName: string;
    xp: number;
    levelInfo: {
        id: number;
        val: number;
    };
};

const Skills = ({
    skillImg,
    skillName,
    xp,
    levelInfo
}: SkillProps) => {
    const currentLevel = (xp >= levelInfo.val) ? levelInfo.id : levelInfo.id - 1;
    
    const currentLevelXpRequirement = levelInfo.id > 1 ? Math.floor(levelInfo.val * 0.85) : 0;
    const nextLevelXpRequirement = levelInfo.val;
    const xpInCurrentLevel = Math.max(0, xp - currentLevelXpRequirement);
    const xpNeededForLevel = nextLevelXpRequirement - currentLevelXpRequirement;
    
    let progressPercentage = 0;
    if (xp >= 15000) {
        progressPercentage = 100; // Max level
    } else if (xpNeededForLevel > 0) {
        progressPercentage = Math.min(100, (xpInCurrentLevel / xpNeededForLevel) * 100);
    }

    return (
    <div className="skill-container">
            <div className='skill-container__item'>
                <span>{`${skillName}`}</span>
                <img 
                    src={skillImg} 
                    alt={skillName}
                    title={`${skillName} - Level ${currentLevel}`}
                    className='skill-container__icon'
                />
                <div className='skill-container__level-indicators' >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            className={`skill-container__level-block ${index === 4 || index === 9 ? 'lg' : 'sm'} ${currentLevel > index ? 'active' : ''}`}
                        />
                    ))}
                </div>
                <span className='skill-container__level-no'>{`${currentLevel}`}</span>
            </div>
        </div>
    )
};

export default Skills;
