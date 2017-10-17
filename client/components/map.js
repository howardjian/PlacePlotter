import React from 'react';

// workaround to make Google's Map canvas global
export var mapCanvas;
export var infoWindow;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { handleCoordsChange, lat, lng } = this.props;

    // Quicker load if you declare initial starting point
    const defaultCenter =  new google.maps.LatLng(lat, lng);

    // initialize map
    mapCanvas = new google.maps.Map(this.refs.map, {
      center: defaultCenter,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(mapCanvas);
        mapCanvas.setCenter(pos);
        handleCoordsChange({lat: position.coords.latitude, lng: position.coords.longitude});
      }, () => {
        handleLocationError(true, infoWindow, mapCanvas.getCenter());
      });
    } else {
     // Browser doesn't support Geolocation
     handleLocationError(false, infoWindow, mapCanvas.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                           'Error: The Geolocation service failed.' :
                           'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(mapCanvas);
    }
  }

  render() {

    return (
      <div ref="map" id="map-canvas">
      </div>
    )
  }
}
