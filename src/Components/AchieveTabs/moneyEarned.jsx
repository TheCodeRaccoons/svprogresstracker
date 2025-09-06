import React from 'react' 

class Earnings extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            moneyEarned: this.props.moneyEarned
            
        }
    }  

    render() {
        return ( 
            <div className="progress-container">   
                <span className="a-title"><h1>You have earned a total of ${this.state.moneyEarned}.</h1></span>
                <br />
                <h2>Total earnings Achievements</h2>
                <ul className="a-List"> 
                    <li>Greenhorn: {(this.state.moneyEarned >= 15000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {15000 - this.state.moneyEarned} more gold to get this achievement.</span> } </li>
                    <li>Cowpoke: {(this.state.moneyEarned >= 50000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {50000 - this.state.moneyEarned} more gold to get this achievement.</span> } </li>
                    <li>Homesteader: {(this.state.moneyEarned >= 250000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {250000 - this.state.moneyEarned} more gold to get this achievement.</span> } </li>
                    <li>Millionaire: {(this.state.moneyEarned >= 1000000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {1000000 - this.state.moneyEarned} more gold to get this achievement.</span> } </li>
                    <li>Legend: {(this.state.moneyEarned >= 10000000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {10000000 - this.state.moneyEarned} more gold to get this achievement.</span> } </li>
                </ul>
            </div>
        );
    }
}

export default Earnings;
