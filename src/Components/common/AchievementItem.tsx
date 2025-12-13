import "./styles/AchievementIte.css";

type AchievementItemProps = {
    done: boolean;
    image: string;
    achievementName: string;
    achievementDesc: string;
    achievementHoverDesc?: string;
}

const AchievementItem = ({
    done,
    image,
    achievementName,
    achievementDesc,
    achievementHoverDesc
}: AchievementItemProps) => {
    return (
        <div className="achievement-item">
            <img 
                className={`${done ? 
                "achieved" : "pending"}`} 
                src={image}
                alt={`${achievementName}`}
                title={achievementHoverDesc && achievementHoverDesc}
            />
            <div>
                <h3>{achievementName}:</h3> 
                <p>{achievementDesc}</p>
            </div>
        </div>
    );
}

export default AchievementItem;