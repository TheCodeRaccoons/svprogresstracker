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
    const currentLevel = (xp >= levelInfo.val) ? levelInfo.id : levelInfo.id - 1;
    const xpToNextLevel = (xp >= 15000) ? 0 : (levelInfo.val - xp);
    const xpToMax = (xp >= 15000) ? "Maxed" : 15000 - xp;
    
    // Calculate progress within current level
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
            <p className="skill-container__title">
                {`${skillName} lvl ${currentLevel}`}
            </p>
            <div className="skill-container__stats">
                <div className="skill-container__stats-line">
                    <div className="skill-container__progress-bar">
                        <div 
                            className="skill-container__progress-fill"
                            style={{
                                width: `${progressPercentage}%`
                            }}
                        ></div>
                    </div>
                    {xpToNextLevel > 0 ? `XP to next level: ${xpToNextLevel}` : "Max Level Reached"}
                    {/* {xp} / {levelInfo.val} */}
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
