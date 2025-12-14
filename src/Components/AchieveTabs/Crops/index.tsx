import { AchievementItem, ItemWithCounter } from '@components/common';
import type { cropsShippedType } from 'types/displayDataTypes';


const Crops= ({poly_crops, mono_extras, achievements} : cropsShippedType) => {
    console.log(achievements)
    return ( 
        <div className="progress-container">  
            <br />
            <h2>Farming Achievements</h2> 
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
            <span className="a-title"><p>Ship 15 of the following crops to get the 'Polyculture' achievement</p></span>
            <div className="item-grid">
            { poly_crops ? 
                poly_crops.map((d, i) =>
                    <ItemWithCounter
                        key={i}
                        link={`https://stardewvalleywiki.com/${d.link}`}
                        src={`https://stardew-tracker.s3.amazonaws.com/Crops/${d.image}.png`}
                        name={d.name}
                        state={ (d.shipped) ? "done" : "known" }
                        hoverDesc={(d.shipped) ? 
                                    (d.shipped && d.shipped > 0) ? `Cooked ${d.name}  ${d.shipped} times` 
                                    : `You haven't cooked ${d.name}` 
                                    : `You don't know how to cook ${d.name}`}
                        times={d.shipped ? d.shipped : 0}
                    />)
                    : <div>No cooking data available.</div>
            }
            </div>

            <span className="a-title"><p>These crops are not counted for the 'Polyculture' achievement</p></span>
                        <div className="item-grid">
            { mono_extras ? 
                mono_extras.map((d, i) =>
                    <ItemWithCounter
                        key={i}
                        link={`https://stardewvalleywiki.com/${d.link}`}
                        src={`https://stardew-tracker.s3.amazonaws.com/Crops/${d.image}.png`}
                        name={d.name}
                        state={ (d.shipped) ? "done" : "known" }
                        hoverDesc={(d.shipped) ? 
                                    (d.shipped && d.shipped > 0) ? `Cooked ${d.name}  ${d.shipped} times` 
                                    : `You haven't cooked ${d.name}` 
                                    : `You don't know how to cook ${d.name}`}
                        times={d.shipped ? d.shipped : 0}
                    />)
                    : <div>No cooking data available.</div>
            }
            </div>
            {/* {cropsShipped.cropsShipped.mono_extras.map((crop, i) =>
            <a href={`https://stardewvalleywiki.com/${crop.image}`} target="_blank" rel="noreferrer" key={i}> 
            <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} 
            alt={crop.name} className={ (crop.shipped !== undefined) ? ((crop.shipped > 0) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? `You have shipped  ${crop.name}  ${crop.shipped} times` : `You haven't shipped ${crop.name}`} ></img></a>)} */}
        </div>
    );
};

export default Crops;
