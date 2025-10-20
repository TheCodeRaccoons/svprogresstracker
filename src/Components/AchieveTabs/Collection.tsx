import React, { useState, useEffect } from 'react'
import type { museumCollectionType } from 'types/displayDataTypes';

interface CollectionProps {
    museumCollection: museumCollectionType;
}

const Collection = ({ museumCollection }: CollectionProps) => {
    const [totalFound, setTotalFound] = useState(0);
    const [totalDelivered, setTotalDelivered] = useState(0);
    const [total, setTotal] = useState(0);

    const getTotalFound = () => {
        const artifacts = museumCollection.artifacts;
        const minerals = museumCollection.minerals;

        const totalArtFound = artifacts.reduce((accum, item) => (item.found) ? accum + 1 : accum, 0);
        const totalMinFound = minerals.reduce((accum, item) => (item.found) ? accum + 1 : accum, 0);
        const totalArtD = artifacts.reduce((accum, item) => (item.inMuseum) ? accum + 1 : accum, 0);
        const totalMinD = minerals.reduce((accum, item) => (item.inMuseum) ? accum + 1 : accum, 0);

        setTotalFound(totalArtFound + totalMinFound);
        setTotalDelivered(totalArtD + totalMinD);
        setTotal(artifacts.length + minerals.length);
    };

    useEffect(() => {
        getTotalFound();
    }, [museumCollection]);

    return (
        <div className="progress-container">  
            <span className="a-title"><h1>{`You've found ${totalFound} objects and delivered ${totalDelivered} / ${total} to the museum`}</h1></span>
            <br />
            <br />
            <h2>Museum Achievements</h2>
            <ul className="a-List"> 
                <li>A Complete Collection: {(total === totalDelivered) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to deliver {total - totalDelivered} more items to get this achievement.</span> } </li>
            </ul>
            <span className="a-title"><h1>Artifacts</h1></span>
            {museumCollection.artifacts.map((item, i) => <a href={`https://stardewvalleywiki.com/${item.image}`} target="blank" key={i}><img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Artifacts/${item.image}.png`} alt={item.name} className={ (item.found) ? item.inMuseum ? "done" : "known": "" } title={(item.found) ? (item.inMuseum) ? `You have delivered ${item.name} to the museum` : `You haven't delivered ${item.name} to the museum` : `You haven't found ${item.name} yet`} ></img></a>)}
    
            <span className="a-title"><h1>Minerals</h1></span>
            {museumCollection.minerals.map((item, i) => <a href={`https://stardewvalleywiki.com/${item.image}`} target="blank" key={i}><img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Minerals/${item.image}.png`} alt={item.name} className={ (item.found) ? item.inMuseum ? "done" : "known" : "" } title={(item.found) ? (item.inMuseum) ? `You have delivered ${item.name} to the museum` : `You haven't delivered ${item.name} to the museum` : `You haven't found ${item.name} yet`} ></img></a>)}
        </div>
    );
};

export default Collection;
