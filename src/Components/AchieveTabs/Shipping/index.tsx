import { AchievementItem, ItemWithCounter } from '@components/common';
import type { shippedItemsType } from 'types/displayDataTypes';

const Shipping = ({ shippedItems, totalItems, achievements, totalShipped }: shippedItemsType ) => {

    return ( 
        <div className="progress-container">   
            <span className="a-title"><h1>You have shipped {totalShipped} / {shippedItems.length} items.</h1></span>
            <br />
            <h2>Shipping Achievements</h2> 
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
                {shippedItems.map((d, i) => 
                    <ItemWithCounter
                        key={d.id}
                        link={`https://stardewvalleywiki.com/${d.link}`}
                        src={`https://stardew-tracker.s3.amazonaws.com/Shipment/${d.image}.png`}
                        name={d.name}
                        state={(d.shipped && d.shipped > 0) ? "done" : "known"}
                        hoverDesc={(d.shipped) ? 
                                        (d.shipped && d.shipped > 0) ? `Shipped ${d.name}  ${d.shipped} times`:
                                        `You haven't shipped ${d.name}`
                                        : `You don't know about ${d.name}`}
                        times={d.shipped ? d.shipped : 0}
                    />
                )}
            </div>
        </div>
    );
};

export default Shipping;
