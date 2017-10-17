import React from 'react';

import { infoWindow, mapCanvas } from './map';
import { markers } from '../utils';

export default class PlaceItem extends React.Component {
  constructor(props){
    super(props);
    this.generateDollar = this.generateDollar.bind(this);
    this.generateInfoWindow = this.generateInfoWindow.bind(this);
  }

  generateDollar(number) {
    if(!number) return null
    let str = '';
    for(let count = 0; count < number; count++) {
      str += '$';
    }
    return str;
  }

  generateInfoWindow(place, index) {
    const content = `<h4>${place.name}</h4>` + `<p>${place.formatted_address}</p>`;

    infoWindow.close();
    infoWindow.setPosition(place.geometry.location);
    infoWindow.setContent(content)
    infoWindow.open(mapCanvas, markers[index]);

  }

  render() {
    const { place, index } = this.props;
    return(
      <div
        key={index}
        onClick={() => this.generateInfoWindow(place, index)}
        value={index}
        className="placeItem">
        <a>
          <div className="photo">
            <img src={place.photos} />
          </div>
          <div className="placeContent">
            <h5>{place.name}</h5>
            <span className={`rating rating-${+Math.floor(place.rating)}`}>
              <i className="star-1">★</i>
              <i className="star-2">★</i>
              <i className="star-3">★</i>
              <i className="star-4">★</i>
              <i className="star-5">★</i>
              <div>
                <p>
                {this.generateDollar(place.price_level)}
                </p>
              </div>
              <div>
                <p>
                {(Math.round(place.distance * 10) / 10).toFixed(1) + " mile"}
                </p>
              </div>
            </span>
            <span>
            { place.opening_hours && place.opening_hours.open_now
              ? <p className="open">Open</p>
              : <p className="closed">Closed Now</p>
            }
            </span>
          </div>
        </a>
      </div>
    )
  }
}
