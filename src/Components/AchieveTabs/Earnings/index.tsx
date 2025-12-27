import { AchievementItem } from "@components/common";
import type { moneyEarnedType } from "types/displayDataTypes";

const Earnings = ( {totalEarned, achievements}: moneyEarnedType ) => {
    return ( 
        <div className="progress-container">   
            <span className="a-title"><h1>You have earned a total of ${totalEarned}.</h1></span>
            <br />
            <h2>Total earnings Achievements</h2>
            <div className="section-achievements">
                {achievements && achievements.map((ach, i) => (
                    <AchievementItem 
                        key={i}
                        done={ach.done}
                        image={ach.image}
                        achievementName={ach.name}
                        achievementDesc={ach.description}
                        achievementHoverDesc={ach.hoverDesc}
                    />))}
            </div>
        </div>
    );
};

export default Earnings;
