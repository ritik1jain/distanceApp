import React, { Component } from 'react';
import { Loading } from './Loading';
import axios from 'axios';
import GOOGLE_MAPS_API_KEY from './secrets';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: null,
      time: null,
      loading: true,
    };
  }
  
  componentWillMount() {
    let distance;
    let time;
    let latorigin;
    let lngorigin;
    let latdest;
    let lngdest;
    const { origin, dest } = this.props.state;
    const self = this;
    axios
      .get(
        `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${GOOGLE_MAPS_API_KEY}&searchtext=${origin}&country:IND`
      )
      .then(function (res) {
        console.log(res);
        latorigin =
          res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
        lngorigin =
          res.data.Response.View[0].Result[0].Location.DisplayPosition
            .Longitude;

        axios
          .get(
            `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${GOOGLE_MAPS_API_KEY}&searchtext=${dest}country:IND`
          )
          .then(function (res) {
            console.log(res);
            latdest =
              res.data.Response.View[0].Result[0].Location.DisplayPosition
                .Latitude;
            lngdest =
              res.data.Response.View[0].Result[0].Location.DisplayPosition
                .Longitude;

            axios
              .get(
                `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${GOOGLE_MAPS_API_KEY}&waypoint0=geo!${latorigin},${lngorigin}&waypoint1=geo!${latdest},${lngdest}&mode=fastest;car;traffic:disabled`
              )
              .then(function (response) {
                time = response.data.response.route[0].summary.baseTime;
                distance = response.data.response.route[0].summary.distance;
                let hr,min,km,m;
                if(distance>1000){
                  km = Math.floor(distance/1000);
                  m = distance%1000;
                  distance = km + ' Km ' + m + ' m';
                }
                if(time>3600)
                {
                  hr = Math.floor(time/3600);
                  min= Math.floor((time-hr*3600)/60)
                  time= hr + ' Hr ' + min + ' min';
                } else if (time>60){
                  min = Math.floor(time/60);
                  time= min + ' mins';
                }

                console.log(response);
                self.setState({
                    distance: distance,
                    time: time,
                    loading: false,
                  });
                
              });
          });
          
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    
      return (
        <div className='col-12 col-md-9'>
          <h4> Distance:</h4>
          {this.state.loading ? <Loading /> : this.state.distance}
          <h4>Travel duration:</h4>
          {this.state.loading ? <Loading /> : this.state.time}
        </div>
      );
    }
  }


export default Result;
