import React, { useState, useEffect } from 'react'
import type { cropsShippedType } from 'types/displayDataTypes';

interface CropsShippedWrapperType {
    cropsShipped: cropsShippedType;
}

const Crops= (cropsShipped : CropsShippedWrapperType) => {
    let _monocultureText = cropsShipped.cropsShipped.hasMonoculture ? "You already have the 'Monoculture' Achievement" : `You've shipped ${ cropsShipped.cropsShipped.maxMono?.name } the most and you require ${300 - cropsShipped.cropsShipped.maxMono?.shipped} more of it to get the 'Monoculture' Achievement`;
    let _polycultureText = cropsShipped.cropsShipped.hasPolyculture ? "You already have the 'Polyculture' Achievement" : `You need to ship 15 crops for each polyculture crop to get the 'Polyculture' achievement`;
    
    return ( 
        <div className="progress-container">  
            {/* <span className="a-title"><h1>{_monocultureAchieved ? `You've shipped ${ maxShipped.name } the most and you require ${300 - maxShipped.times} more of it to get the 'Monoculture' Achievement` : <span className="completed">`You already have the 'Monoculture' Achievement`</span> }</h1></span> */}
            <br />
            <h2>Farming Achievements</h2>
            <ul className="a-List"> 
                <li>Monoculture: <span className={cropsShipped.cropsShipped.hasMonoculture ? "completed" : "pending"}>{_monocultureText}</span> </li>
                <li>Polyculture: <span className={cropsShipped.cropsShipped.hasPolyculture ? "completed" : "pending"}>{_polycultureText}</span></li>
            </ul>
            <span className="a-title"><p>Ship 15 of the following crops to get the 'Polyculture' achievement</p></span>
            {cropsShipped.cropsShipped.poly_crops.map((crop, i) =><a href={`https://stardewvalleywiki.com/${crop.image}`} target="_blank" rel="noreferrer" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} alt={crop.name} className={ (crop.shipped !== undefined) ? ((crop.shipped >= 15) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? (crop.shipped >= 15) ? `You have shipped  ${crop.name}  ${crop.shipped} times` : `You have to ship ${ 15 - crop.shipped} more ${crop.name} ` : `You haven't shipped ${crop.name}`} ></img></a>)}

            <span className="a-title"><p>These crops are not counted for the 'Polyculture' achievement</p></span>
            {cropsShipped.cropsShipped.mono_extras.map((crop, i) =><a href={`https://stardewvalleywiki.com/${crop.image}`} target="_blank" rel="noreferrer" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} alt={crop.name} className={ (crop.shipped !== undefined) ? ((crop.shipped > 0) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? `You have shipped  ${crop.name}  ${crop.shipped} times` : `You haven't shipped ${crop.name}`} ></img></a>)}
        </div>
    );
};

export default Crops;
