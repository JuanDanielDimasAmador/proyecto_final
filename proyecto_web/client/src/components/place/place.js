import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PlaceItem from '../places/placeitem';
import { CriticForm } from '../critic/commentform';

import { getPlace } from "../../actions/placeactions";
import { CriticFeed } from "../critic/commentfeed";

class Place extends Component{
    componentDidMount(){
        this.props.getPlace(this.props.match.params.id);
        console.log(this.props.match.params.id);
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
                criticform: <CriticForm postID={place._id}/>,
                criticfeed: <CriticFeed comments={place.critics} postID={place._id}/>
            };
        } else {
            placeContent = [
                <PlaceItem key={place._id} place={place} cssClass={"place"} withActions={false}/>,
                <CriticForm placeID={place._id}/>
            ]

        }

        return(
            <div className="place">
                <div className="place__container">
                    <Link to={"/lugares"} className="button button-small">Volver atras</Link>
                    {placeContent.placeitem}
                </div>
                <div className="critic">
                    { auth.isAuthenticated ? placeContent.criticform : null }
                    <div className="critic__feed">
                        { place !== null ? placeContent.criticfeed : null }
                    </div>
                </div>
            </div>
        )

    }
}

Place.propTypes = {
    getPlace: PropTypes.func,
    critic: PropTypes.object,
    auth: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    critic: state.critic
});

export default connect(mapStateToProps, { getPlace }) (Place);