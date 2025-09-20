import React, { useState, useEffect } from 'react'  
import ActiveH from '@media/Heart_active.png'
import InactiveH from '@media/Heart_disabled.png'

interface FriendshipData {
    level: number;
    name: string;
    lvlup: number;
    dateable: boolean;
}

interface FriendshipProps {
    friendship: FriendshipData[];
}

const Friendship: React.FC<FriendshipProps> = ({ friendship }) => {
    const [five, setFive] = useState(0);
    const [ten, setTen] = useState(0);

    const displayHearts = (numHearts: number) => {
        let hearts = []
        for(let i = 0; i < 10; i++){ 
            hearts.push(<img key={i} src={(i < numHearts) ? ActiveH : InactiveH } alt={(i <= numHearts) ? "owned":"missing"} width="18"></img>)
        }
        return hearts;        
    };

    const getFriendAchievements = () => {
        let totalFive = 0
        let totalTen = 0
        friendship.forEach(el => { 
            if(el.level >= 5){
                totalFive += 1;
            } 
            if(el.level >= 10){
                totalTen += 1;
            } 
        }); 

        setFive(totalFive);
        setTen(totalTen);
    };

    useEffect(() => {   
        getFriendAchievements();
    }, [friendship]);

    return ( 
        <div className="progress-container-flex">    

            <h2>Friendship Achievements</h2>
                <ul className="a-List"> 
                    <li>A New Friend: {(five >= 1) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {1 - five} Villagers</span> } </li>
                    <li>Cliques:  {(five >= 4) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {4 - five} Villagers </span>}</li>
                    <li>Networking : {(five >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {10 - five} Villagers </span>}</li>
                    <li>Popular: {(five >= 20) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {20 - five} Villagers </span>}</li>
                    <li>Best Friends: {(ten >= 1) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to increase your friendship with {1 - ten} Villagers </span>} </li>
                    <li>The Beloved Farmer:  {(ten >= 8) ? <span className="completed">You have this achievement</span> : <span className="pending"> You need to increase your friendship with {8 - ten} Villagers </span> }</li>
                    <li>Introductions quest: TBD </li>
                </ul>

            {friendship.map((d, i) => 
                <div className="npc-data"  key={i}>
                    <h2>{d.name}</h2>
                    <img className="friendship" src={`https://stardew-tracker.s3.amazonaws.com/Friendship/${d.name}.png`} alt={d.name} title={(d.lvlup > 10) ? `You have ${d.level} hearts with this npc` : (d.dateable && d.level === 8) ? `You need to start a relationship with ${d.name} to increase your friendship level`  :`you need ${d.lvlup} points to level up`} ></img>
                    {displayHearts(d.level)}
                </div>
                    
            )}
        </div>
    );
};

export default Friendship;
