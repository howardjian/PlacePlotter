import React from 'react';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleRadiusChange, radius, handleOpenNowChange, openNow } = this.props;
    return(
      <div>
        <div className="form-group">
          <div>
            <label htmlFor="sel1">Radius:</label>
            <select value={radius} onChange={handleRadiusChange} className="form-control">
              <option value={402}>.25 mile</option>
              <option value={805}>.5 mile</option>
              <option value={1609}>1 mile</option>
              <option value={3219}>2 miles</option>
            </select>
          </div>
          <div>
            <label htmlFor="sel1">Availability:</label>
            <select value={openNow} onChange={handleOpenNowChange} className="form-control">
              <option value={false}>All</option>
              <option value={true}>Open Now</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}
