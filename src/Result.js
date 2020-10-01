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
        axios.get(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${GOOGLE_MAPS_API_KEY}&searchtext=${origin}`)
        .then(function(res){
            console.log(res);
           latorigin = res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
             lngorigin = res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
        })
        .catch(function(error) {
            console.log(error);
        });

        axios.get(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${GOOGLE_MAPS_API_KEY}&searchtext=${dest}`)
        .then(function(res){
            console.log(res);
            latdest = res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
            lngdest = res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
            console.log(latdest);
        })
        .catch(function(error) {
            console.log(error);
        });

        axios.get(`https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${GOOGLE_MAPS_API_KEY}&waypoint0=geo!${latorigin},${lngorigin}&waypoint1=geo!${latdest},${lngdest}&mode=fastest;car;traffic:disabled`)
        .then(function(response) {
            // if(response.status === "OK")
            // {
            //     distance = response.rows[0].elements[0].distance.text;
            //     time= response.rows[0].elements[0].duration.text;
            // }
            console.log(response);
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