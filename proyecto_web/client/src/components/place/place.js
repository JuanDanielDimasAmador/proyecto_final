import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PlaceItem from '../places/placeitem';

import { getPlace } from "../../actions/placeactions";


class Place extends Component{
    componentDidMount(){
        this.props.getPlace(this.props.match.params.id);     

    }

    render(){
        let placeContent;
        const { place, loading } = this.props.place,
            {auth} = this.props;

        if ( place === null || loading ) {
            placeContent = <h4>Loading...</h4>;
        } else if (place !== null && !loading) {
            placeContent = {
                placeitem: <PlaceItem key={place._id} place = {place} cssClass={"place"} withActions={false}/>,
            };
        } else {
            placeContent = [
                <PlaceItem key={place._id} place={place} cssClass={"place"} withActions={false}/>,
            ];

        }

        return(
            <div className="comment">
                <div className="comment__container">
                    <Link to={"/lugares"} className="button button-small">Volver atras</Link>
                    {placeContent.placeitem}
                </div>
            </div>
        )
    }
}

Place.propTypes = {
    getPlace: PropTypes.func,
    place: PropTypes.object,
    auth: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    place: state.place
});

export default connect(mapStateToProps, { getPlace }) (Place);