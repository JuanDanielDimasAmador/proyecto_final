import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlaceItem extends Component {
    render() {
        const { place } = this.props;
        return (
            <div className="comment__item">
                <h4 className="comment__item--user">{place.name}</h4>
                <span>{place.type}</span>
                <p><b>Descipción: </b></p>  <p className="comment__item--text">{place.description}</p>
                <p><b>Dirección:  </b></p>  <p className="comment__item--text">{place.location.direction}</p> 
            </div>
        )
    }
}

PlaceItem.propTypes = {
    place: PropTypes.object.isRequired
};

export default PlaceItem;