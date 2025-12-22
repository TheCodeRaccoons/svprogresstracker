import { AchievementItem } from "@components/common";
import type { monsterDataType } from "types/displayDataTypes";

const Monsters = ({ monsterData, achievements } :monsterDataType) => {
    // const getQuestData = (monsters: MonsterData) => {
    //     return(
    //             <li key={monsters.goal}>
    //                 <span className="goal-mg">{monsters.images.map((image, i) =><a href={`https://stardewvalleywiki.com/${image.img}`} target="_blank" rel="noreferrer" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${image.img}.png`} className="done" title={image.name} alt={image.name} width="21px" ></img> </a>) }</span>
    //     {monsters.category}: {(monsters.timesKilled >= monsters.goal) ?  <span className="completed"> {monsters.timesKilled} / {monsters.goal}</span> : <span className="pending"> {monsters.timesKilled} / {monsters.goal}</span> } 
    //             </li>    
    //     );
    // };
    console.log('monsterData', monsterData);

    return ( 
        <div className="progress-container-flex">  
            <br />
            <h2>Monster Erradication Achievements</h2> 
            <div className="section-achievements">
                {achievements && achievements.map((ach, i) => (
                    <AchievementItem 
                        key={i}
                        done={ach.done}
                        image={ach.image}
                        achievementName={ach.name}
                        achievementDesc={ach.description}
                        achievementHoverDesc={ach.hoverDesc}
                    />))}
            </div>
        <span className="a-title"><h1>Monster Eradication Goals</h1></span>
            <br /> 
            <br />
            {/* <ul className="m-List"> 
                { monstersKilled.slice(0, 5).map( m => getQuestData(m))} 
            </ul>
            <ul className="m-List">
                { monstersKilled.slice(5).map( m => getQuestData(m))} 
            </ul>  */}
        </div>
    );
};

export default Monsters;
