import React, { useState, useEffect } from 'react'
import type { generalFormatedItemType } from 'types/displayDataTypes';

interface FishProps {
    fishCaught: generalFormatedItemType[];
}

const Fish = ({ fishCaught }: FishProps) => {
    const [totalFished, setTotalFished] = useState(0);

    const getCraftedItems = (items: generalFormatedItemType[]) => {
        return items.map((num) => (num.fished) ? 1 : 0).reduce((n: number, next: number) => next + n, 0);
    };
    
    useEffect(() => {  
        setTotalFished(getCraftedItems(fishCaught));
    }, [fishCaught]);

    return ( 
        <div className="progress-container">  
            <span className="a-title"><h1>{ `You've fished ${totalFished} out of ${fishCaught.length}`}</h1></span>
            <br />
            <h2>Fishing Achievements</h2>
            <ul className="a-List"> 
                <li>Fisherman: {(totalFished >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to catch {15 - totalFished} more fish to get this</span> } </li>
                <li>Ol' Mariner: {(totalFished >= 24) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to catch {30 - totalFished} more fish to get this </span>}</li>
                <li>Master Angler : {(totalFished >= fishCaught.length) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to catch {fishCaught.length - totalFished} more fish to get this </span>}</li>
            </ul>
            <br />
            {fishCaught.map((fish, i) => <a href={`https://stardewvalleywiki.com/${fish.image}`} target="blank" key={i}><img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Fishing/${fish.image}.png`} alt={fish.name} className={ (fish.fished) ? "done" : ""} title={(fish.fished) ? `You've caught  ${fish.name}` :  `You haven't fished ${fish.name}`} ></img></a>)}

        </div>
    );
};

export default Fish;
