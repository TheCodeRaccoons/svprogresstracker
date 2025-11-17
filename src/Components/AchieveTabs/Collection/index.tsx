import type { museumCollectionType } from 'types/displayDataTypes';

interface CollectionProps {
    museumCollection: museumCollectionType;
}

const Collection = ({ museumCollection: mc }: CollectionProps) => {
    const createCollectionItem = (item: any, i: number, type: string) => {
        return (
            <a href={`https://stardewvalleywiki.com/${item.image}`} target="blank" key={i}>
                <img 
                    key={i} 
                    src={`https://stardew-tracker.s3.amazonaws.com/${type}/${item.image}.png`} 
                    alt={item.name} 
                    className={ (item.found) ? item.inMuseum ? "done" : "known": "" } 
                    title={(item.found) ? (item.inMuseum) ? 
                        `You have delivered ${item.name} to the museum` : 
                        `You haven't delivered ${item.name} to the museum` : 
                        `You haven't found ${item.name} yet`
                    } 
                />
            </a>
        );
    };

    return (
        <div className="progress-container">  
            <span className="a-title">
                <h1>
                    {`You've found ${mc.totalFound || 0} objects and delivered ${mc.totalDelivered || 0} / ${mc.total || 0} to the museum`}
                </h1>
            </span>
            <br />
            <br />
            <h2>Museum Achievements</h2>
            <ul className="a-List"> 
                <li>A Complete Collection: {(mc.missingItemsText === undefined) ? 
                    <span className="completed">You have this achievement</span> :
                    <span className="pending">{mc.missingItemsText}</span>
                    }
                </li>
            </ul>
            <span className="a-title"><h1>Artifacts</h1></span>
            {mc.artifacts.map((item, i) => createCollectionItem(item, i, "Artifacts"))}
    
            <span className="a-title"><h1>Minerals</h1></span>
            {mc.minerals.map((item, i) => createCollectionItem(item, i, "Minerals"))}
        </div>
    );
};

export default Collection;
