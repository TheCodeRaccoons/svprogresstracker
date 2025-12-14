import React, { useState, useEffect } from 'react'

interface CraftingItem {
    times?: number;
    name: string;
    image: string;
}

interface CraftingProps {
    itemsCrafted: CraftingItem[];
}

const Crafting: React.FC<CraftingProps> = ({ itemsCrafted }) => {
    const [totalCrafted, setTotalCrafted] = useState(0);

    const getCraftedItems = (items: CraftingItem[]) => {
        return items.map((num) => (num.times !== undefined && num.times > 0 && num.name !== "Wedding Ring") ? 1 : 0).reduce((n: number, next: number) => next + n, 0);
    };

    useEffect(() => {
        setTotalCrafted(getCraftedItems(itemsCrafted));
    }, [itemsCrafted]);

    const craftedCount = itemsCrafted.map((num) => (num.times !== undefined && num.times > 0) ? 1 : 0).reduce((n: number, next: number) => next + n, 0);
    const knownCount = itemsCrafted.map((num) => (num.times !== undefined && num.times >= 0) ? 1 : 0).reduce((n: number, next: number) => next + n, 0);

    return (
        <div className="progress-container"> 
            <span className="a-title"><h1>has crafted {craftedCount} and knows {knownCount} of {itemsCrafted.length} recipes.</h1></span>
            <br />
            <h2>Crafting Achievements</h2>
            <ul className="a-List"> 
                <li>D.I.Y.: {(totalCrafted >= 15) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to craft {15 - totalCrafted} more items to get this</span> } </li>
                <li>Artisan: {(totalCrafted >= 30) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to craft {30 - totalCrafted} more items to get this </span>}</li>
                <li>Craft Master: {(totalCrafted >= 104) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to craft {104 - totalCrafted} more items to get this </span>}</li>
            </ul>
            <br />
            {itemsCrafted.map((item, i) => (
            <a href={`https://stardewvalleywiki.com/${item.image}`} 
                target="_blank" 
                rel="noreferrer" 
                key={i}>
                <img 
                key={i} 
                src={`https://stardew-tracker.s3.amazonaws.com/Crafting/${item.image}.png`} 
                alt={item.name} 
                className={(item.times !== undefined) ? ((item.times > 0) ? "done" : "known") : "" } 
                title={(item.times !== undefined) ? ((item.times > 0) ? `You have crafted "${item.name}" ${item.times} Times` : `You haven't crafted any ${item.name} yet`) : `You don't know how to craft ${item.name} yet`}>
                </img>
            </a>))}
        </div>
    );
};

export default Crafting;