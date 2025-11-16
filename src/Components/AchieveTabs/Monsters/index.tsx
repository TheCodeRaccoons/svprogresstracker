import React from 'react'

interface MonsterImage {
    img: string;
    name: string;
}

interface MonsterData {
    goal: number;
    images: MonsterImage[];
    category: string;
    timesKilled: number;
}

interface MonstersProps {
    monstersKilled: MonsterData[];
}

const Monsters: React.FC<MonstersProps> = ({ monstersKilled }) => {
    const getQuestData = (monsters: MonsterData) => {
        return(
                <li key={monsters.goal}>
                    <span className="goal-mg">{monsters.images.map((image, i) =><a href={`https://stardewvalleywiki.com/${image.img}`} target="blank" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${image.img}.png`} className="done" title={image.name} alt={image.name} width="21px" ></img> </a>) }</span>
        {monsters.category}: {(monsters.timesKilled >= monsters.goal) ?  <span className="completed"> {monsters.timesKilled} / {monsters.goal}</span> : <span className="pending"> {monsters.timesKilled} / {monsters.goal}</span> } 
                </li>    
        );
    };

    return ( 
        <div className="progress-container-flex">  
        
        <span className="a-title"><h1>Monster Eradication Goals</h1></span>
            <br /> 
            <br />
            <ul className="m-List"> 
                { monstersKilled.slice(0, 5).map( m => getQuestData(m))} 
            </ul>
            <ul className="m-List">
                { monstersKilled.slice(5).map( m => getQuestData(m))} 
            </ul> 
        </div>
    );
};

export default Monsters;
