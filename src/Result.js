import React, {Component} from 'react';
 
import axios from 'axios';
import GOOGLE_MAPS_API_KEY from './secrets';

class Result extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        let distance;
        let time;
        let latorigin;
        let lngorigin;
        let latdest;
        let lngdest;
        const {origin, dest} = this.props.state;
        axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                address: origin,
                key: GOOGLE_MAPS_API_KEY
            }
        })
        .then(function(response){
           latorigin = response.data.results[0].geometry.location.lat;
             lngorigin = response.data.results[0].geometry.location.lng;
        })
        .catch(function(error) {
            console.log(error);
        });

        axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            
            params: {
                address: dest,
                key: GOOGLE_MAPS_API_KEY
            }
        })
        .then(function(response){
            console.log(response);
           latdest = response.data.results[0].geometry.location.lat;
             lngdest = response.data.results[0].geometry.location.lng;
        })
        .catch(function(error) {
            console.log(error);
        });

        axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            
            params: {
                origins:latorigin,lngorigin,
                destinations:latdest,lngdest,
                key:GOOGLE_MAPS_API_KEY,
                region:'IN'
            }
        })
        .then(function(response) {
            if(response.status === "OK")
            {
                distance = response.rows[0].elements[0].distance.text;
                time= response.rows[0].elements[0].duration.text;
            }
        })
        .catch(function(error) {
            console.log(error);
        })

        return(
            <div className="col-12 col-md-9">
                <h4> Distance:</h4>
                <p>{distance}</p>
                <h4>Travel duration:</h4>
                <p>{time}</p>
            </div>
        );
    }
}


export default Result;