import React from 'react'  

class Collection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shippedCrops: this.props.cropsShipped,
        }
    }  
    
    timesShipped = (arr) => {
        let Max = []
        let name = []
        arr.poly_crops.map( crop => {
            Max = (crop.shipped !== undefined) ? [...Max, parseInt(crop.shipped.times)] : [...Max]
            name = (crop.shipped !== undefined) ? [...name, crop.name] : [...name]
        })
        arr.mono_extras.map( crop => {
            Max = (crop.shipped !== undefined) ? [...Max, parseInt(crop.shipped.times)] : [...Max]
            name = (crop.shipped !== undefined) ? [...name, crop.name] : [...name]
        })
        var indexOfMaxValue = Max.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0) 
        this.setState({
            maxShipped: {
                name: name[indexOfMaxValue],
                times: Max[indexOfMaxValue]
            }
        })
    }

    componentWillMount() { 
        this.timesShipped(this.state.shippedCrops)
    } 
    render() {
        return ( 
            <div className="progress-container">  
                <span className="a-title"><h1>{(this.state.maxShipped.times < 300) ? `You've shipped ${ this.state.maxShipped.name } the most and you require ${300 - this.state.maxShipped.times} more of it to get the 'Monoculture' Achievement` : <span className="completed">`You already have the 'Monoculture' Achievement`</span> }</h1></span>
                <br /><br />
                <span className="a-title"><h1>Ship 15 of the following crops to get the 'Polyculture' achievement</h1></span>
                {this.state.shippedCrops.poly_crops.map((crop, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} alt={crop.name} className={ (crop.shipped !== undefined) ? ((parseInt(crop.shipped.times) >= 15) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? (parseInt(crop.shipped.times) >= 15) ? `You have shipped  ${crop.name}  ${crop.shipped.times} times` : `You have to ship ${ 15 - parseInt(crop.shipped.times)} more ${crop.name} ` : `You haven't shipped ${crop.name}`} ></img>)}
        
                <span className="a-title"><h1>This crops are not counted for the 'Polyculture' achievement</h1></span>
                {this.state.shippedCrops.mono_extras.map((crop, i) => <img key={i} src={`https://stardew-tracker.s3.amazonaws.com/Crops/${crop.image}.png`} alt={crop.name} className={ (crop.shipped !== undefined) ? ((parseInt(crop.shipped.times) > 0) ? "done" : "known" ): "" } title={(crop.shipped !== undefined) ? `You have shipped  ${crop.name}  ${crop.shipped.times} times` : `You haven't shipped ${crop.name}`} ></img>)}
            </div>
        );
    }
}

export default Collection;
