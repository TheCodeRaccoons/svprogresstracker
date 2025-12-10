import type { cookingDataType } from 'types/displayDataTypes';
import { Cook, SousChef, GourmetChef } from '@media/Achievements';
import './Cooking.css';
import { AchievementItem,ItemWithCounter } from '@components/common';

const Food = ( {cookedItems, knownRecipes, alreadyCookedRecipes} : cookingDataType) => {
    return ( 
        <div className="progress-container">   
            <span className="a-title">
                <h2>
                    Has cooked {alreadyCookedRecipes}, knowing {knownRecipes} out of 81 recipes
                </h2>
            </span>
            <br />
            <h2>Cooking Achievements</h2>
            <div className="section-achievements">
                <AchievementItem 
                    done={alreadyCookedRecipes >= 10}
                    image={Cook}
                    achievementName="Cook"
                    achievementDesc="Cook a total of 10 dishes"
                    achievementHoverDesc={alreadyCookedRecipes >= 10 ? 
                        'Achievement unlocked!' : 
                        'You need to cook at least 10 dishes to unlock this achievement.'}
                />
                <AchievementItem 
                    done={alreadyCookedRecipes >= 25}
                    image={SousChef}
                    achievementName="Sous Chef"
                    achievementDesc="Cook a total of 25 dishes"
                    achievementHoverDesc={alreadyCookedRecipes >= 25 ?  
                            'Achievement unlocked!' : 
                            `You need to cook ${25 - alreadyCookedRecipes} more dishes to unlock this achievement.`}
                />
                <AchievementItem 
                    done={alreadyCookedRecipes >= 81}
                    image={GourmetChef}
                    achievementName="Gourmet Chef"
                    achievementDesc="Cook a total of 81 dishes"
                    achievementHoverDesc={alreadyCookedRecipes >= 81 ?  
                            'Achievement unlocked!' : 
                            `You need to cook ${81 - alreadyCookedRecipes} more dishes to unlock this achievement.`}
                />
            </div>
            <br />
            <div className="dishes-grid">
            { cookedItems ? 
                cookedItems.map((d, i) =>
                    <ItemWithCounter
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
