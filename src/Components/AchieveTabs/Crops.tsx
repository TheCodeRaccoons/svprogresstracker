import React, { useState, useEffect } from 'react'

interface CropShipped {
    shipped?: {
        times: string;
    };
    name: string;
    image: string;
}

interface CropsShippedData {
    poly_crops: CropShipped[];
    mono_extras: CropShipped[];
}

interface CropsProps {
    cropsShipped: CropsShippedData;
}

const Crops: React.FC<CropsProps> = ({ cropsShipped }) => {
    const [maxShipped, setMaxShipped] = useState<{name: string, times: number}>({name: '', times: 0});
    
    const timesShipped = (arr: CropsShippedData) => {
        let Max: number[] = []
        let name: string[] = []
        arr.poly_crops.forEach( crop => {
            Max = (crop.shipped !== undefined) ? [...Max, parseInt(crop.shipped.times)] : [...Max]
            name = (crop.shipped !== undefined) ? [...name, crop.name] : [...name]
        })
        arr.mono_extras.forEach( crop => {
            Max = (crop.shipped !== undefined) ? [...Max, parseInt(crop.shipped.times)] : [...Max]
            name = (crop.shipped !== undefined) ? [...name, crop.name] : [...name]
        })
        
        if (Max.length === 0 || name.length === 0) {
            setMaxShipped({name: 'None', times: 0});
            return;
        }
        
        const indexOfMaxValue = Max.reduce((iMax: number, x: number, i: number, arr: number[]) => {
            return x > (arr[iMax] ?? 0) ? i : iMax;
        }, 0);
        setMaxShipped({
            name: name[indexOfMaxValue] || 'Unknown',
            times: Max[indexOfMaxValue] || 0
        });
    };

    useEffect(() => { 
        timesShipped(cropsShipped);
    }, [cropsShipped]);

    return ( 
        <div className="progress-container">  
            <span className="a-title"><h1>{(maxShipped.times < 300) ? `You've shipped ${ maxShipped.name } the most and you require ${300 - maxShipped.times} more of it to get the 'Monoculture' Achievement` : <span className="completed">`You already have the 'Monoculture' Achievement`</span> }</h1></span>
            <br /><br />
            <span className="a-title"><h1>Ship 15 of the following crops to get the 'Polyculture' achievement</h1></span>
            {cropsShipped.poly_crops.map((crop, i) =><a href={`https://stardewvalleywiki.com/${crop.image}`} target="blank" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} alt={crop.name} className={ (crop.shipped !== undefined) ? ((parseInt(crop.shipped.times) >= 15) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? (parseInt(crop.shipped.times) >= 15) ? `You have shipped  ${crop.name}  ${crop.shipped.times} times` : `You have to ship ${ 15 - parseInt(crop.shipped.times)} more ${crop.name} ` : `You haven't shipped ${crop.name}`} ></img></a>)}
    
            <span className="a-title"><h1>This crops are not counted for the 'Polyculture' achievement</h1></span>
            {cropsShipped.mono_extras.map((crop, i) =><a href={`https://stardewvalleywiki.com/${crop.image}`} target="blank" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} alt={crop.name} className={ (crop.shipped !== undefined) ? ((parseInt(crop.shipped.times) > 0) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? `You have shipped  ${crop.name}  ${crop.shipped.times} times` : `You haven't shipped ${crop.name}`} ></img></a>)}
        </div>
    );
};

export default Crops;
