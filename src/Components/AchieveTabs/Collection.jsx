import React from 'react'  

class Collection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            museumCollection: this.props.museumCollection
        }
    }

    GetTotalFound = () => {
        let artifacts = this.state.museumCollection.artifacts
        let minerals = this.state.museumCollection.minerals 
        let totalArtFound = 0
        let totalMinFound = 0
        let totalArtD = 0
        let totalMinD = 0

        totalArtFound = artifacts.reduce((accum,item) => (item.found) ? accum + 1 : accum, 0)
        totalMinFound = minerals.reduce((accum,item) => (item.found) ? accum + 1 : accum, 0)
        totalArtD = artifacts.reduce((accum,item) => (item.inMuseum) ? accum + 1 : accum, 0)
        totalMinD = minerals.reduce((accum,item) => (item.inMuseum) ? accum + 1 : accum, 0)

        this.setState({
            totalFound: totalArtFound + totalMinFound,
            totalDelivered: totalArtD + totalMinD,
            total: artifacts.length + minerals.length
        })
    }    

    UNSAFE_componentWillMount = () =>{
        this.GetTotalFound()
    }


    render() {
        return ( 
            <div className="progress-container">  
                <span className="a-title"><h1>{`You've found ${this.state.totalFound} objects and delivered ${this.state.totalDelivered} / ${this.state.total} to the museum`}</h1></span>
                <br />
                <br />
                <h2>Museum Achievements</h2>
                <ul className="a-List"> 
                    <li>A Complete Collection: {(this.state.total === this.state.totalDelivered) ? <span className="completed">You have this achievement</span> : <span className="pending">You need to deliver {this.state.total - this.state.totalDelivered} more items to get this achievement.</span> } </li>
                </ul>
                <span className="a-title"><h1>Artifacts</h1></span>
                {this.state.museumCollection.artifacts.map((item, i) => <a href={`https://stardewvalleywiki.com/${item.image}`} target="blank" key={i}><img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Artifacts/${item.image}.png`} alt={item.name} className={ (item.found) ? item.inMuseum ? "done" : "known": "" } title={(item.found) ? (item.inMuseum) ? `You have delivered ${item.name} to the museum` : `You haven't delivered ${item.name} to the museum` : `You haven't found ${item.name} yet`} ></img></a>)}
        
                <span className="a-title"><h1>Minerals</h1></span>
                {this.state.museumCollection.minerals.map((item, i) => <a href={`https://stardewvalleywiki.com/${item.image}`} target="blank" key={i}><img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Minerals/${item.image}.png`} alt={item.name} className={ (item.found) ? item.inMuseum ? "done" : "known" : "" } title={(item.found) ? (item.inMuseum) ? `You have delivered ${item.name} to the museum` : `You haven't delivered ${item.name} to the museum` : `You haven't found ${item.name} yet`} ></img></a>)}
            </div>
        );
    }
}

export default Collection;
