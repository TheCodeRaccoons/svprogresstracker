import { AchievementItem, ItemWithCounter } from '@components/common';
import type { fishCaughtType } from 'types/displayDataTypes';

const Fish = ({ 
    fishCaught,
    catchedFish,
    total,
    achievements }: fishCaughtType) => {

    return ( 
        <div className="progress-container">  
            <span className="a-title">
                <h2>
                    Has fished {fishCaught} out of {total}.
                </h2>
            </span>
            <br />
            <h2>Fishing Achievements</h2>
            
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
            <br />
            <div className="item-grid">
                { catchedFish ? 
                    catchedFish.map((d, i) =>
                        <ItemWithCounter
                            key={i}
                            link={`https://stardewvalleywiki.com/${d.link}`}
                            src={`https://stardew-tracker.s3.amazonaws.com/Fishing/${d.image}.png`}
                            name={d.name}
                            state={ (d.fished) ? "done" : "unknown" }
                            hoverDesc={(d.fished) ? `Has caught ${d.name}` 
                                        : `You haven't caught ${d.name}`}
                            times={d.fished ? null : undefined}
                        />)
                        : <div>No fishing data available.</div>
                }
            </div>
        </div>
    );
};

export default Fish;
