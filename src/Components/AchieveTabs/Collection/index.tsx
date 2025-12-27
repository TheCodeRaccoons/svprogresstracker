import { AchievementItem, ItemWithCounter } from '@components/common';
import type { museumCollectionType } from 'types/displayDataTypes';

const Collection = ({ 
    totalFound, 
    totalDelivered, 
    total,
    artifacts,
    minerals,
    achievements }: museumCollectionType) => {

    return (
        <div className="progress-container">  
            <span className="a-title">
                <h2>
                    {`Has found ${totalFound || 0} items and donated ${totalDelivered || 0} / ${total || 0} to the museum`}
                </h2>
            </span>
            <br />
            <br />
            <h2>Museum Achievements</h2>
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
            <span className="a-title"><h1>Artifacts</h1></span>
            <div className="item-grid">
                { artifacts ? 
                    artifacts.map((artifact, i) =>
                        <ItemWithCounter
                            key={i}
                            link={`https://stardewvalleywiki.com/${artifact.name}`}
                            src={`https://stardew-tracker.s3.amazonaws.com/Artifacts/${artifact.image}.png`}
                            name={artifact.name}
                            state={ (artifact.found) ? artifact.inMuseum ? "done" : "known" : "unknown" }
                            hoverDesc={(artifact.found) ? 
                                        (artifact.inMuseum ) ? `Already donated ${artifact.name}` 
                                        : `You haven't donated ${artifact.name}` 
                                        : `You haven't found ${artifact.name}`} 
                            times={artifact.found ? null : undefined}
                        />)
                        : <div>No cooking data available.</div>
                }
            </div>
    
            <span className="a-title"><h1>Minerals</h1></span>
            <div className="item-grid">
                { minerals ? 
                    minerals.map((mineral, i) =>
                        <ItemWithCounter
                            key={i}
                            link={`https://stardewvalleywiki.com/${mineral.name}`}
                            src={`https://stardew-tracker.s3.amazonaws.com/Minerals/${mineral.image}.png`}
                            name={mineral.name}
                            state={ (mineral.found) ? mineral.inMuseum ? "done" : "known" : "unknown" }
                            hoverDesc={(mineral.found) ? 
                                        (mineral.inMuseum ) ? `Already donated ${mineral.name}` 
                                        : `You haven't donated ${mineral.name}` 
                                        : `You haven't found ${mineral.name}`}
                            times={mineral.found ? null : undefined}
                        />)
                        : <div>No cooking data available.</div>
                }
            </div>
        </div>
    );
};

export default Collection;
