import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import Place from '../components/Place'
//import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
//import MyGreatPlace from './my_great_place.jsx';

export default class LocationHistoryGoogleMap extends Component {

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    shouldComponentUpdate(nextProps) {
        return true;//!this.arraysEqual(this.props.places, nextProps.places);
    }

    constructor(props) {
        super(props);
    }

    render() {

        var defaultProps = {
            center: {lat: 59.938043, lng: 30.337157},
            zoom: 9,
            greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
        };
        var divStyle = {
            height: '500px'
        };


        var placesObj = this.props.places;
        var places = new Array();
        if (placesObj != null) {
            for (var place in placesObj) {
                places.push(placesObj[place]);
            }
        }
        var placesCounter = 0;
        var placeComponents = places.map(function (place) {
            placesCounter++;
            var str = placesCounter;
            return <Place color="red" key={place._id} lat={place.lat} lng={place.lon} text={placesCounter}/>
        });
        return (
            <div style={divStyle}>
                <GoogleMap
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}>
                    {placeComponents}

                </GoogleMap>
            </div>
        );
    }
}


function mapStateToProps(state) {
    var placesObj = state.places;
    var places = new Array();
    if (placesObj != null) {
        for (var place in placesObj) {
            places.push(placesObj[place]);
        }
    }

    return {
        places
    }
}


export default connect(mapStateToProps, {})(LocationHistoryGoogleMap)