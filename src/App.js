import React, { Component } from 'react';
import data from './mapStyle.json';
import './App.css';

class App extends Component {
  state= {
    map: '',
    marker: ''
  }
  componentDidMount() {
        window.initMap = this.initMap
        loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&v=3&callback=initMap')
      /*  loadScript('https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&center=24.01830986718526,64.79041753732734&zoom=3&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.country%7Ccolor:0x000000%7Cvisibility:on&style=feature:administrative.country%7Celement:geometry.fill%7Cvisibility:on%7Cweight:2&style=feature:administrative.country%7Celement:labels.text%7Cvisibility:off&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0xffffff%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=480x360');
*/
      }






  initMap = () => {
    const google = window.google;
    // Constructor creates a new map
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.3664032, lng: 9.7441556},
      zoom: 8
    })
    let marker = new google.maps.Marker({
    position: {lat: 52.3664032, lng: 9.7441556},
    map: map,
  });
    this.setState({map: map, marker: marker})
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
