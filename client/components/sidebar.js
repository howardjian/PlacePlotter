import React from 'react';

import PlaceItem from './placeItem';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleTextChange, textInput, handleClick, places, available, handlePlaceClick } = this.props;

    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            ref="searchBar"
            value={textInput}
            onChange={handleTextChange}
            placeholder="Let's go somewhere!"/>
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-default glyphicon glyphicon-search"
              onClick={handleClick} >
            </button>
          </span>
        </div>
        <div id="placesList">
          <div>
            <div>
              { places.length > 0
                ?
                places.map((place, index) => (
                  <PlaceItem
                    place={place}
                    index={index}
                    key={index}/>
                ))
                :
                null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
