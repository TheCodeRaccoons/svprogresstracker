import React from 'react'

interface EarningsProps {
    moneyEarned: number;
}

const Earnings: React.FC<EarningsProps> = ({ moneyEarned }) => {
    return ( 
        <div className="progress-container">   
            <span className="a-title"><h1>You have earned a total of ${moneyEarned}.</h1></span>
            <br />
            <h2>Total earnings Achievements</h2>
            <ul className="a-List"> 
                <li>Greenhorn: {(moneyEarned >= 15000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {15000 - moneyEarned} more gold to get this achievement.</span> } </li>
                <li>Cowpoke: {(moneyEarned >= 50000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {50000 - moneyEarned} more gold to get this achievement.</span> } </li>
                <li>Homesteader: {(moneyEarned >= 250000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {250000 - moneyEarned} more gold to get this achievement.</span> } </li>
                <li>Millionaire: {(moneyEarned >= 1000000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {1000000 - moneyEarned} more gold to get this achievement.</span> } </li>
                <li>Legend: {(moneyEarned >= 10000000) ? <span className="completed">You have this achievement</span> : <span className="pending">You need {10000000 - moneyEarned} more gold to get this achievement.</span> } </li>
            </ul>
        </div>
    );
};

export default Earnings;
