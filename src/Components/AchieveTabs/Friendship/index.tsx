import { AchievementItem } from '@components/common';
import ActiveH from '@media/Heart_active.png'
import InactiveH from '@media/Heart_disabled.png'
import type { friendshipType } from 'types/displayDataTypes';
import './Friendship.css'

const Friendship = ({ friendship, achievements }: friendshipType) => {
    const displayHearts = (numHearts: number) => {
        let hearts = []
        for(let i = 0; i < 10; i++){ 
            hearts.push(
                <img 
                    key={i} 
                    className="heart-ico"
                    src={(i < numHearts) ? ActiveH : InactiveH } 
                    alt={(i <= numHearts) ? "owned":"missing"} 
                />)
        }
        return hearts;        
    };

    return ( 
        <div className="progress-container-flex">    
            <h2>Friendship Achievements</h2>
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
            <h2>Friendship Levels</h2>
            <div className="npc-grid">
            {friendship.map((d, i) => 
                <div className="npc-data"  key={i}>
                    <h2>{d.name}</h2>
                    <img className="friendship" src={`https://stardew-tracker.s3.amazonaws.com/Friendship/${d.name}.png`} alt={d.name} title={(d.lvlup > 10) ? `You have ${d.level} hearts with ${d.name}` : (d.dateable && d.level === 8) ? `You need to start a relationship with ${d.name} to increase your friendship level`  :`you need ${d.lvlup} points to level up`} ></img>
                    <div className="heart-display">{displayHearts(d.level)}</div>
                </div>
                    
            )}
            </div>
        </div>
    );
};

export default Friendship;
