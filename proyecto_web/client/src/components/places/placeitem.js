import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { deletePlace } from "../../actions/placeactions";


class PlaceItem extends Component {

    onDeleteClick(id){
        this.props.deletePlace(id);
    }

    render() {

        const { place, cssClass } = this.props;


        return (
            <div className={`${cssClass}__item`}>
                <h2 className={`${cssClass}__item--title`}>
                    { cssClass === "place" ? place.name : <Link to={`/lugares/${place._id}`} className={`feed__item--link`}>{place.name}</Link> }
                    <span className={`${cssClass}__item--user`}>Tipo:&nbsp;{place.type}</span>
                </h2>
                <p><b>Descipción: </b></p>  <p className="comment__item--text">{place.description}</p>
                <p><b>Dirección:  </b></p>  <p className="comment__item--text">{place.location.direction}</p>           
            </div>
        )
    }
}

PlaceItem.propTypes = {
    place: PropTypes.object,
    auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deletePlace})(PlaceItem);