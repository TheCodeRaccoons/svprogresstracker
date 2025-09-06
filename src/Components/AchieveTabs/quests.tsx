import React from 'react' 

class Quests extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            questsDone:         this.props.questsDone,
            specialReq:         this.props.specialReq,
            pendingSpecialReq:  this.props.pendingSpecialReq 
        }
    }  

    GetQuestData = (monsters) => {
        return(
            <li key={monsters.goal}>
                    <span className="goal-mg">{monsters.images.map((image, i) =><a href={`https://stardewvalleywiki.com/${image.img}`} target="blank" key={i}> <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Monsters/${image.img}.png`} className="done" title={image.name} alt={image.name} width="21px" ></img> </a>) }</span>
        {monsters.category}: {(monsters.timesKilled >= monsters.goal) ?  <span className="completed"> {monsters.timesKilled} / {monsters.goal}</span> : <span className="pending"> {monsters.timesKilled} / {monsters.goal}</span> } 
                </li>    
        )
    }
    render() {
        return ( 
            <div className="progress-container-flex">   
                <span className="a-title"><h1>You have done a total of {this.state.questsDone} 'Help Wanted' requests.</h1></span>
                <br />
                <h2>'Help Wanted' Achievements</h2>
                <ul className="a-List"> 
                    <li>Gofer: {(this.state.questsDone >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to complete {10 - this.state.questsDone} more requests to get this achievement.</span> } </li>
                    <li>A Big Help: {(this.state.questsDone >= 40) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to complete {40 - this.state.questsDone} more requests to get this achievement.</span> } </li>
                </ul> 
                <span className="a-title-big"><h1>Special Orders.</h1></span> 
                <ul className="m-List"> 
                    {this.state.specialReq.map((m,i) =>  <li key={i}> <span className="completed">{m.name}: {m.description}</span> </li>)}
                </ul> 
                <ul className="m-List">
                    {this.state.pendingSpecialReq.map((m,i) => <li key={i}><span className="pending" >{m.name}: {m.description}.</span></li>)} 
                </ul>  
            </div>
        );
    }
}

export default Quests;
