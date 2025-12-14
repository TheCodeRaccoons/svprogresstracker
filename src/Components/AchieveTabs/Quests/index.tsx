import React from 'react'

interface QuestImage {
    img: string;
    name: string;
}

interface QuestData {
    goal: number;
    images: QuestImage[];
    category: string;
    timesKilled: number;
}

interface SpecialRequest {
    name: string;
    description: string;
}

interface QuestsProps {
    questsDone: number;
    specialReq: SpecialRequest[];
    pendingSpecialReq: SpecialRequest[];
}

const Quests: React.FC<QuestsProps> = ({ questsDone, specialReq, pendingSpecialReq }) => {
    const getQuestData = (monsters: QuestData) => {
        return(
            <li key={monsters.goal}>
                    <span className="goal-mg">{monsters.images.map((image, i) =><a href={`https://stardewvalleywiki.com/${image.img}`} target="_blank" rel="noreferrer" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${image.img}.png`} className="done" title={image.name} alt={image.name} width="21px" ></img> </a>) }</span>
        {monsters.category}: {(monsters.timesKilled >= monsters.goal) ?  <span className="completed"> {monsters.timesKilled} / {monsters.goal}</span> : <span className="pending"> {monsters.timesKilled} / {monsters.goal}</span> } 
                </li>    
        );
    };
    
    return ( 
        <div className="progress-container-flex">   
            <span className="a-title"><h1>You have done a total of {questsDone} 'Help Wanted' requests.</h1></span>
            <br />
            <h2>'Help Wanted' Achievements</h2>
            <ul className="a-List"> 
                <li>Gofer: {(questsDone >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to complete {10 - questsDone} more requests to get this achievement.</span> } </li>
                <li>A Big Help: {(questsDone >= 40) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to complete {40 - questsDone} more requests to get this achievement.</span> } </li>
            </ul> 
            <span className="a-title-big"><h1>Special Orders.</h1></span> 
            <ul className="m-List"> 
                {specialReq ? specialReq.map((m,i) =>  <li key={i}> <span className="completed">{m.name}: {m.description}</span> </li>) : null}
            </ul> 
            <ul className="m-List">
                {pendingSpecialReq ? pendingSpecialReq.map((m,i) => <li key={i}><span className="pending" >{m.name}: {m.description}.</span></li>) : null}
            </ul>  
        </div>
    );
};

export default Quests;
