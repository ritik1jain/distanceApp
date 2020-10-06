import React , { Component } from 'react';
import GOOGLE_MAPS_API_KEY from './secrets';
import './map.css'
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://image.maps.ls.hereapi.com/mia/1.6/routing?'
        }

    }

    render() {
        const {lat,lng} = this.props;
        const latorigin = lat.origin;
        const lngorigin =  lng.origin;
        const latdest = lat.dest;
        const lngdest = lng.dest;
        
        return (<img className="map" src={ this.state.url + `apiKey=${GOOGLE_MAPS_API_KEY}&waypoint0=${latorigin},${lngorigin}&waypoint1=${latdest},${lngdest}&poix0=${latorigin},${lngorigin};white;white;21;.&poix1=${latdest},${lngdest};red;red;21;.&lc=1652B4&lw=10&t=5&ppi=310&w=1125&h=250`} alt="Map" />       )
    }
}

export default Map;
 