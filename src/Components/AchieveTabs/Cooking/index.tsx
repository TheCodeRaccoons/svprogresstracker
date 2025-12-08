import type { cookingDataType } from 'types/displayDataTypes';
import { Cook, SousChef, GourmetChef } from '@media/Achievements';
import './Cooking.css';

const Food = ( {cookedItems, knownRecipes, alreadyCookedRecipes} : cookingDataType) => {
    return ( 
        <div className="progress-container">   
            <span className="a-title">
                <h2>
                    Has cooked {alreadyCookedRecipes}, knowing {knownRecipes} out of 74 recipes
                </h2>
            </span>
            <br />
            <h2>Cooking Achievements</h2>
            <div className="section-achievements">
                <div className="achievement-item">
                    <img 
                        className={`${(alreadyCookedRecipes >= 10) ? 
                        "achieved" : "pending"}`} 
                        src={Cook}
                        alt="Cook Achievement"
                    />
                    <div>
                        <h3>Cook:</h3> 
                        <p>Cook a total of 10 dishes</p>
                    </div>
                </div>
                <div className="achievement-item">
                    <img 
                        className={`${(alreadyCookedRecipes >= 25) ? 
                        "achieved" : "pending"}`} 
                        src={SousChef}
                        alt="Sous Chef Achievement"
                    />
                    <div>
                        <h3>Sous Chef:</h3> 
                        <p>Cook a total of 25 dishes</p>
                    </div>
                </div>
                <div className="achievement-item">
                    <img 
                        className={`${(alreadyCookedRecipes >= 74) ? 
                        "achieved" : "pending"}`} 
                        src={GourmetChef}
                        alt="Gourmet Chef Achievement"
                    />
                    <div>
                        <h3>Gourmet Chef:</h3> 
                        <p>Cook a total of 74 dishes</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="dishes-grid">
            { cookedItems ? 
                cookedItems.map((d, i) => 
                    <a 
                    href={`https://stardewvalleywiki.com/${d.link}`} 
                    target="blank" 
                    key={i}
                    className="dish-item">
                        <img 
                            src={`https://stardew-tracker.s3.amazonaws.com/Cooking/${d.image}.png`} 
                            alt={d.name} 
                            className={ (d.times !== undefined) ? ((d.times > 0) ? "done" : "known" ): "" } 
                            title={(d.times !== undefined) ? 
                                (d.times > 0) ? `Cooked ${d.name}  ${d.times} times` 
                                : `You haven't cooked ${d.name}` 
                                : `You don't know how to cook ${d.name}`
                            } >
                        </img>
                        <p className="times-cooked">x{d.times}</p>
                    </a>) 
                : <div>No cooking data available.</div>
            }
            </div>
        </div>
    );
};

export default Food;
