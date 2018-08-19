import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPlaces } from "../../actions/placeactions";

class Places extends Component {

    componentDidMount() {
        this.props.getPlaces();
    }

    render() {
        return (
            <div className="hola">Chinga tu madre</div>
        )
    }
}

Places.propTypes = {
    auth: PropTypes.object,
    place: PropTypes.object,
    getPlaces: PropTypes.func,
};

const mapStateToProps = state => ({
    place: state.place,
    auth: state.auth
});

export default connect(mapStateToProps,{getPlaces}) (Places);
