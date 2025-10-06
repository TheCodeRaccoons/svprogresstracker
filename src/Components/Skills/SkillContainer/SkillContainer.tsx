import './SkillContainer.css';

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
    const currentLevel = (xp > levelInfo.val) ? levelInfo.id : levelInfo.id - 1;
    const xpToNextLevel = (xp > 15000) ? 0 : (levelInfo.val - xp);
    const xpToMax = (xp > 15000) ? "Maxed" : 15000 - xp;

    return (
        <div className="skill-container">
            <p className="skill-container__title">
                {`${skillName} lvl ${currentLevel}`}
            </p>
            <div className="skill-container__stats">
                <div className="skill-container__stats-line">
                    Current XP: {xp}
                </div>
                <div className="skill-container__stats-line">
                    Level Up in: {xpToNextLevel}
                </div>
                <div className="skill-container__stats-line">
                    Max level in: {xpToMax}
                </div>
            </div>
            <img 
                src={skillImg} 
                alt={skillName}
                className="skill-container__icon"
                title={`${skillName} - Level ${currentLevel}`}
            />
        </div>
    );  
};

export default Skills;
