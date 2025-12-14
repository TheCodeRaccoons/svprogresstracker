import type { cookingDataType } from 'types/displayDataTypes';
import './Cooking.css';
import { AchievementItem,ItemWithCounter } from '@components/common';

const Food = ( {cookedItems, knownRecipes, alreadyCookedRecipes, totalRecipes, achievements} : cookingDataType) => {
    return ( 
        <div className="progress-container">   
            <span className="a-title">
                <h2>
                    Has cooked {alreadyCookedRecipes}, knowing {knownRecipes} out of {totalRecipes} recipes
                </h2>
            </span>
            <br />
            <h2>Cooking Achievements</h2>
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
            <div className="dishes-grid">
            { cookedItems ? 
                cookedItems.map((d, i) =>
                    <ItemWithCounter
                        key={i}
                        link={`https://stardewvalleywiki.com/${d.link}`}
                        src={`https://stardew-tracker.s3.amazonaws.com/Cooking/${d.image}.png`}
                        name={d.name}
                        state={ (d.knownDish) ? ((d.times && d.times > 0) ? "done" : "known" ): "unknown" }
                        hoverDesc={(d.knownDish) ? 
                                    (d.times && d.times > 0) ? `Cooked ${d.name}  ${d.times} times` 
                                    : `You haven't cooked ${d.name}` 
                                    : `You don't know how to cook ${d.name}`}
                        times={d.knownDish ? d.times : undefined}
                    />)
                    : <div>No cooking data available.</div>
            }
            </div>
        </div>
    );
};

export default Food;
