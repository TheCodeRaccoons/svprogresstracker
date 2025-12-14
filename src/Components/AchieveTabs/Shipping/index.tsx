import React, { useState, useEffect } from 'react'

interface ShippedItem {
    shipped?: any;
    image: string;
    name: string;
}

interface ShippingProps {
    shippedItems: ShippedItem[];
}

const Shipping: React.FC<ShippingProps> = ({ shippedItems }) => {
    const [totalShipped, setTotalShipped] = useState(0);

    const getAchievements = () => {
        let total = 0 
        shippedItems.forEach(el => { 
            if((el.shipped !== undefined)){
                total += 1;
            }  
        }); 

        setTotalShipped(total);
    };

    useEffect(() => {
        getAchievements();
    }, [shippedItems]);

    return ( 
        <div className="progress-container">   
            <span className="a-title"><h1>You have shipped {totalShipped} / {shippedItems.length} items.</h1></span>
            <br />
            <h2>Shipping Achievements</h2>
            <ul className="a-List"> 
                <li>Full Shipment: {(totalShipped === shippedItems.length) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to ship {shippedItems.length - totalShipped} more item to get this achievement.</span> } </li>
            </ul>
            <br />
            {shippedItems.map((d, i) => <a href={`https://stardewvalleywiki.com/${d.image}`} target="_blank" rel="noreferrer" key={i}><img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Shipment/${d.image}.png`} alt={d.name} className={ (d.shipped !== undefined) ?  "done" : "" } title={(d.shipped !== undefined) ? `You have shipped ${d.name}` : `You haven't shipped ${d.name}`} ></img></a>)}
        </div>
    );
};

export default Shipping;
