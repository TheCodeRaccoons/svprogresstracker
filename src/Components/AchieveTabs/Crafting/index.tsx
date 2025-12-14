import { AchievementItem, ItemWithCounter } from "@components/common";
import type { itemsCraftedType } from "types/displayDataTypes";

const Crafting = ({ 
        knownItems,
        alreadyCraftedItems,
        craftedItems,
        totalRecipes,
        achievements }: itemsCraftedType) => {
    return (
        <div className="progress-container">
            <span className="a-title">
                <h2>
                    has crafted {alreadyCraftedItems} and knows {knownItems} of {totalRecipes} recipes.
                </h2>
            </span>
            <br />
            <h2>Crafting Achievements</h2>
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
            { craftedItems ? 
                craftedItems.map((d, i) =>
                    <ItemWithCounter
                        key={i}
                        link={`https://stardewvalleywiki.com/${d.image}`}
                        src={`https://stardew-tracker.s3.amazonaws.com/Crafting/${d.image}.png`}
                        name={d.name}
                        state={ (d.known) ? ((d.times && d.times > 0) ? "done" : "known" ): "unknown" }
                        hoverDesc={(d.known) ? 
                                    (d.times && d.times > 0) ? `Crafted ${d.name}  ${d.times} times` 
                                    : `You haven't crafted ${d.name}` 
                                    : `You don't know how to craft ${d.name}`}
                        times={d.known ? d.times : undefined}
                    />)
                    : <div>No crafting data available.</div>
            }
            </div>
        </div>
    );
};

export default Crafting;