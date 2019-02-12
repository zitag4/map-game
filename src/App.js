import React, { Component } from 'react';
import './App.css';
import geolib from 'geolib';
import GameOver from './GameOver.js';

class App extends Component {
  state= {
    locations: '',
    map: '',
    marker: '',
    currentCity: '',
    index: -1,
    match: 0,
    kmLeft: 1500
  }

  componentDidMount() {
    window.initMap = this.initMap
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&sensor=false&v=3&callback=initMap')

    //    loadScript('https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&center=39.086053069081146,40.55353826195705&zoom=4&format=png&maptype=roadmap&style=feature:administrative%7Cvisibility:off&style=feature:administrative.country%7Cvisibility:on&style=feature:administrative.country%7Celement:labels.text%7Cvisibility:off&style=feature:landscape%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Cvisibility:off&style=feature:water%7Cvisibility:off&style=feature:water%7Celement:geometry%7Cvisibility:on&style=feature:water%7Celement:labels.text%7Cvisibility:off&size=480x360');
  }

  initMap = () => {
    const locData = require('./capitalCities1.json');
    console.log(locData)
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

    //add Marker on click
    google.maps.event.addListener(map, 'click', (event) => {this.addMarker(event)}  );

    //search for cities geocode
    let geocoder = new google.maps.Geocoder();
    for (let i=0; i<locData.capitalCities.length; i++) {
      let city = locData.capitalCities[i].capitalCity;
      if (locData.capitalCities[i].lat === "" || locData.capitalCities[i].long === "") {
        geocoder.geocode({'address': city}, (results, status) => {
          if (status === 'OK') {
            locData.capitalCities[i].lat=results[0].geometry.location.lat();
            locData.capitalCities[i].long=results[0].geometry.location.lng();
          }
          //  else console.log('error')
        });
      }
    }
    this.setState({map: map, locations: locData, index: 0})
  }

  calcDistance = () => {
    let dist = geolib.getDistance(
      {latitude: this.state.locations.capitalCities[this.state.index].lat, longitude: this.state.locations.capitalCities[this.state.index].long},
      {latitude: this.state.marker.position.lat(), longitude: this.state.marker.position.lng()}
    );
    let currentCityLatLong = new window.google.maps.LatLng(parseFloat(this.state.locations.capitalCities[this.state.index].lat),parseFloat(this.state.locations.capitalCities[this.state.index].long));
    let currentCity = new window.google.maps.Marker({
      position: currentCityLatLong,
      map: this.state.map
    })
    this.setState({index: this.state.index+1, currentCity: currentCity})

    //high score
    if (dist<=50000) {
      this.setState({match: this.state.match + 1})
    }
    //decrementing score
    let kmLeft = (this.state.kmLeft - dist/1000).toFixed(0)
    this.setState({kmLeft})
  }

  addMarker = (event) => {
    if(this.state.marker) {
      this.state.marker.setMap(null)
      this.state.currentCity.setMap(null)
      }
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    //console.log( latitude + ', ' + longitude );

    let marker = new window.google.maps.Marker({
      position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
      map: this.state.map
    })
    this.setState({marker: marker})
  }

  gameOver = () => {
    if (this.state.kmLeft <= 0) {
      console.log('game over')
      const popup = document.querySelector('.win');
      popup.style.display === 'flex' ? popup.style.display = 'none' : popup.style.display = 'flex';
    }
  }

  newGame = () => {
    const popup = document.querySelector('.win');
    popup.style.display === 'none' ? popup.style.display = 'flex' : popup.style.display = 'none';
    this.setState({kmLeft: 1500, match: 0, index: 0})
    this.state.marker.setMap(null)
    this.state.currentCity.setMap(null)
  }

  render() {
    return (
      <div className="App">
        <header>
         {this.state.index >=0 ?
          <h1>Select the location of {this.state.locations.capitalCities[this.state.index].capitalCity}</h1> : null}
          <button className="place" onClick={this.calcDistance}>Place</button>
          <div className='score'>
            <p>{this.state.kmLeft} km left</p>
            <p>{this.state.match} city found</p>
          </div>
        </header>
        <main>
	        <div id='map' role='application'/>
          <GameOver
          match={this.state.match}
          gameOver={this.gameOver()}
          newGame={this.newGame}/>
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
