import React from 'react' 

class Quests extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            questsDone: this.props.questsDone
            
        }
    }  

    render() {
        return ( 
            <div className="progress-container">   
                <span className="a-title"><h1>You have done a total of {this.state.questsDone} 'Help Wanted' requests.</h1></span>
                <br />
                <h2>'Help Wanted' Achievements</h2>
                <ul className="a-List"> 
                    <li>Gofer: {(this.state.questsDone >= 10) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to complete {10 - this.state.questsDone} more requests to get this achievement.</span> } </li>
                    <li>A Big Help: {(this.state.questsDone >= 40) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to complete {40 - this.state.questsDone} more requests to get this achievement.</span> } </li>
               </ul>
            </div>
        );
    }
}

export default Quests;
