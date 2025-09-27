import React, { useState, useEffect } from 'react'
import type { cropsShippedType } from 'types/savefile';

interface CropsProps {
    cropsShipped: cropsShippedType;
}

const Crops= ({ cropsShipped }: CropsProps) => {
    const [maxShipped, setMaxShipped] = useState<{name: string, times: number}>({name: '', times: 0});

    const timesShipped = (arr: cropsShippedType) => {
        let maxPoly = arr.poly_crops.sort((a, b) => {
            const aTimes = a.shipped ? a.shipped : 0;
            const bTimes = b.shipped ? b.shipped : 0;
            return bTimes - aTimes; // Sort in descending order
        });
        let maxMono = arr.mono_extras.sort((a, b) => {
            const aTimes = a.shipped ? a.shipped : 0;
            const bTimes = b.shipped ? b.shipped : 0;
            return bTimes - aTimes; // Sort in descending order
        });
        console.log('maxPoly', maxPoly)
        if ((maxPoly === undefined || maxPoly.length === 0) && (maxMono === undefined || maxMono.length === 0)) {
            setMaxShipped({name: 'None', times: 0});
            return;
        } else {
            const polyShipped = maxPoly[0]?.shipped || 0;
            const monoShipped = maxMono[0]?.shipped || 0;
            if (polyShipped > monoShipped) {
                setMaxShipped({
                    name: maxPoly[0]?.name || 'Unknown',
                    times: maxPoly[0]?.shipped || 0
                });
            } else {
                setMaxShipped({
                    name: maxMono[0]?.name || 'Unknown',
                    times: maxMono[0]?.shipped || 0
                });
            }
        }
    };

    useEffect(() => { 
        console.log('cs', cropsShipped)
        timesShipped(cropsShipped);
    }, [cropsShipped]);

    console.log(maxShipped)
    let _monocultureAchieved = maxShipped.times >= 300;
    let _totalShipped = 0 //cropsShipped.poly_crops.reduce((acc, crop) => acc + (crop.shipped ? crop.shipped : 0), 0);
    let _polycultureAchieved = _totalShipped >= 15;
    let _monocultureText = _monocultureAchieved ? "You already have the 'Monoculture' Achievement" : `You've shipped ${ maxShipped.name } the most and you require ${300 - maxShipped.times} more of it to get the 'Monoculture' Achievement`;
    let _polycultureText = _polycultureAchieved ? "You already have the 'Polyculture' Achievement" : `You need to ship ${15 - _totalShipped} more crops to get the 'Polyculture' achievement`;

    return ( 
        <div className="progress-container">  
            <span className="a-title"><h1>{_monocultureAchieved ? `You've shipped ${ maxShipped.name } the most and you require ${300 - maxShipped.times} more of it to get the 'Monoculture' Achievement` : <span className="completed">`You already have the 'Monoculture' Achievement`</span> }</h1></span>
            <br />
            <h2>Farming Achievements</h2>
            <ul className="a-List"> 
                <li>Monoculture: <span className={_monocultureAchieved ? "completed" : "pending"}>{_monocultureText}</span> </li>
                <li>Polyculture: <span className={_polycultureAchieved ? "completed" : "pending"}>{_polycultureText}</span></li>
            </ul>
            <span className="a-title"><p>Ship 15 of the following crops to get the 'Polyculture' achievement</p></span>
            {cropsShipped.poly_crops.map((crop, i) =><a href={`https://stardewvalleywiki.com/${crop.image}`} target="blank" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} alt={crop.name} className={ (crop.shipped !== undefined) ? ((crop.shipped >= 15) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? (crop.shipped >= 15) ? `You have shipped  ${crop.name}  ${crop.shipped} times` : `You have to ship ${ 15 - crop.shipped} more ${crop.name} ` : `You haven't shipped ${crop.name}`} ></img></a>)}

            <span className="a-title"><p>This crops are not counted for the 'Polyculture' achievement</p></span>
            {cropsShipped.mono_extras.map((crop, i) =><a href={`https://stardewvalleywiki.com/${crop.image}`} target="blank" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} alt={crop.name} className={ (crop.shipped !== undefined) ? ((crop.shipped > 0) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? `You have shipped  ${crop.name}  ${crop.shipped} times` : `You haven't shipped ${crop.name}`} ></img></a>)}
        </div>
    );
};

export default Crops;
