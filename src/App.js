import React, { Component } from 'react';
import * as dataLocations from './capitalCities1.json';
import './App.css';

class App extends Component {
  state= {
    locations: dataLocations,
    map: '',
    marker: ''
  }



  componentDidMount() {
    window.initMap = this.initMap
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&v=3&callback=initMap')

    //    loadScript('https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&center=39.086053069081146,40.55353826195705&zoom=4&format=png&maptype=roadmap&style=feature:administrative%7Cvisibility:off&style=feature:administrative.country%7Cvisibility:on&style=feature:administrative.country%7Celement:labels.text%7Cvisibility:off&style=feature:landscape%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Cvisibility:off&style=feature:water%7Cvisibility:off&style=feature:water%7Celement:geometry%7Cvisibility:on&style=feature:water%7Celement:labels.text%7Cvisibility:off&size=480x360');

    console.log(this.state.locations);



  }



  initMap = () => {


    const google = window.google;
    let marker;
    // Constructor creates a new map
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.3664032, lng: 9.7441556},
      zoom: 8,
      styles: [
          {
            "featureType": "administrative",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
    });

    this.setState({map: map})

    //add Marker on click
    google.maps.event.addListener(map, 'click', function(event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        console.log( latitude + ', ' + longitude );

        marker = new google.maps.Marker({
          position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
          map: map
        });

      //igazitja a terkepet
      //  map.panTo(new google.maps.LatLng(latitude,longitude));
      })
      this.setState({marker: marker})
      //search for cities geocode
      let geocoder = new google.maps.Geocoder();
      for (let i=0; i<this.state.locations.default.capitalCities.length; i++) {
          let city = this.state.locations.default.capitalCities[i].capitalCity;
          geocoder.geocode({'address': city}, (results, status) => {
            if (status === 'OK') {
              let lat=results[i].geometry.location.lat();
              let long=results[i].geometry.location.lng();
              console.log(lat,long)
            }
            else console.log('error')
          });
      console.log('MMMM' + city) }

      }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <main>
	         <div id='map' role='application'></div>
	      </main>
      </div>
    );
  }
}

function loadScript(src) {
  let tag = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');

  script.src = src;
  script.async = true;
  tag.parentNode.insertBefore(script, tag);
}

export default App;
