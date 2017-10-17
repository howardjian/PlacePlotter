import React from 'react';

// Component imports
import Navbar from './navbar';
import Map from './map';
import Sidebar from './sidebar';
import Settings from './settings';

// Global object imports
import { mapCanvas, infoWindow } from './map';

// Util imports
import {
  createMarkers,
  places
} from '../utils';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openNow: false,
      lat: 37.7852332,
      lng: -122.3978821,
      places: [],
      radius: 1609,
      textInput: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCoordsChange = this.handleCoordsChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.handleOpenNowChange = this.handleOpenNowChange.bind(this);
    this.handlePlaceClick = this.handlePlaceClick.bind(this);
  }

  componentDidMount() {
    this.service = new google.maps.places.PlacesService(mapCanvas);
  }

  handleCoordsChange(coords){
    this.setState({
      lat: coords.lat,
      lng: coords.lng
    })
  }

  handleTextChange(e) {
    this.setState({textInput: e.target.value});
  }

  handleClick(e) {
    infoWindow.close();
    const self = this;

    const currentLocation =  new google.maps.LatLng(this.state.lat, this.state.lng);

    const request = {
      location: currentLocation,
      openNow: this.state.openNow,
      radius: this.state.radius,
      query: this.state.textInput
    };

    this.service.textSearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results, mapCanvas, request);
        self.setState({places});
      } else {
        console.error('No places found');
        return;
      }
    }
  }

  handleOpenNowChange(event) {
    this.setState({openNow: event.target.value});
  }

  handleRadiusChange(event) {
    this.setState({radius: event.target.value});
  }

  handlePlaceClick(event) {
    console.log(this.refs);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <Map handleCoordsChange={this.handleCoordsChange}
              lat={this.state.lat}
              lng={this.state.lng}
              />
            <Settings
              handleRadiusChange={this.handleRadiusChange}
              handleOpenNowChange={this.handleOpenNowChange}
              radius={this.state.radius}
              openNow={this.state.openNow}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <Sidebar textInput={this.state.textInput}
              handleTextChange={this.handleTextChange}
              handleClick={this.handleClick}
              places={this.state.places}
              openNow={this.state.openNow}
              handlePlaceClick={this.handlePlaceClick}
            />
          </div>
        </div>
      </div>
    )
  }
}
