import { AchievementItem, ItemWithCounter } from "@components/common";
import type { monsterDataType } from "types/displayDataTypes";

const Monsters = ({ monsterData, achievements } :monsterDataType) => {
    return ( 
        <div className="progress-container-flex">  
            <br />
            <span className="a-title">
                <h2>Monster Erradication Achievements</h2> 
            </span>
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
            <span className="a-title">
                <h2>Monster Eradication Goals</h2>
            </span>
            <br />  
            <div className="item-grid">
                {monsterData && monsterData.map((monster, i) =>
                    <ItemWithCounter 
                        key={monster.category}
                        link={`https://stardewvalleywiki.com/Monsters#${monster.category.replace(/\s+/g, '_')}`}
                        src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${monster?.images[0]?.img || ''}.png`}
                        name={monster.category}
                        state={ (monster.timesKilled >= monster.goal) ? "done" : "known" }
                        hoverDesc={ (monster.timesKilled >= monster.goal) ? 
                                    `You have completed the ${monster.category} monster eradication goal!` 
                                    : `You have killed ${monster.timesKilled} out of ${monster.goal} required.` }
                        times={monster.timesKilled >= 0 ? monster.timesKilled : 0}
                        {...monster} 
                    />)
                }
            </div>
        </div>
    );
};

export default Monsters;
