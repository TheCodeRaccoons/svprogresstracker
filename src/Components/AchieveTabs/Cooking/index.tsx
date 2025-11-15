import { useState, useEffect } from 'react'
import type { generalFormatedItemType } from 'types/displayDataTypes';

interface dishesCookedType {
    cookedItems: generalFormatedItemType[];
}

const Food = ( {cookedItems} : dishesCookedType) => {
    const [dishesCooked, setDishesCooked] = useState(0);
    if(!cookedItems) return <div>No cooking data available.</div>;

    const canMap = (cookedItems && cookedItems.length > 0);
    console.log("Cooking data:", cookedItems);
    useEffect(() => {  
        const cookedCount = canMap ? cookedItems.map((num) => (num.times !== undefined && num.times > 0) ? 1 : 0).reduce((n: number, next: number) => n + next, 0) : 0;
        setDishesCooked(cookedCount);
    }, [cookedItems]);
    const cookedCount = canMap ? cookedItems.map((num) => (num.times !== undefined && num.times > 0) ? 1 : 0).reduce((n: number, next: number) => n + next, 0) : 0;
    const knownCount = canMap ? cookedItems.map((num) => (num.times !== undefined && num.times >= 0) ? 1 : 0).reduce((n: number, next: number) => n + next, 0) : 0;

    return ( 
        <div className="progress-container">   
            <span className="a-title"><h1>You have cooked {cookedCount}, knowing {knownCount} out of {cookedItems.length} recipes</h1></span>
            <br />
            <h2>Cooking Achievements</h2>
            <ul className="a-List"> 
                <li>Cook: {(dishesCooked >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to cook {10 - dishesCooked} more dishes to get this</span> } </li>
                <li>Sous Chef:  {(dishesCooked >= 25) ? <span className="completed">You have this achievement</span> : <span className="pending"> You need to cook {25 - dishesCooked} more dishes to get this</span> }</li>
                <li>Gourmet Chef: {(dishesCooked >= 74) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to cook {74 - dishesCooked} more dishes to get this</span> }</li>
            </ul>
            <br />
            { canMap ? 
                cookedItems.map((d, i) => <a href={`https://stardewvalleywiki.com/${d.link}`} target="blank" key={i}><img src={`https://stardew-tracker.s3.amazonaws.com/Cooking/${d.image}.png`} alt={d.name} className={ (d.times !== undefined) ? ((d.times > 0) ? "done" : "known" ): "" } title={(d.times !== undefined) ? (d.times > 0) ? `Cooked ${d.name}  ${d.times} times` : `You haven't cooked ${d.name}` : `You don't know how to cook ${d.name}`} ></img></a>) 
                : null
            }
        </div>
    );
};

export default Food;
