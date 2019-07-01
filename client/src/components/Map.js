import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import PlaceTwoTone from './PinIcon';
import { withStyles } from '@material-ui/core/styles';
import Context from '../context';
import Blog from './Blog';

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
const initialViewport = {
  width: '100%',
  height: '91vh',
  latitude: 10.799634,
  longitude: 78.709643,
  zoom: 11
};

const Map = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const [viewport, setViewport] = useState(initialViewport);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const getLocation = () => {
    window.navigator.geolocation.getCurrentPosition(position => {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };

  //Map clickHandleFunction
  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;

    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' });
    }

    const [longitude, latitude] = lngLat;

    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { latitude, longitude }
    });
  };
  return (
    <>
      <div className={classes.root}>
        <ReactMapGL
          mapStyle='mapbox://styles/mapbox/dark-v9'
          mapboxApiAccessToken='pk.eyJ1Ijoic2FyYW5vbmVhcnRoIiwiYSI6ImNqeGp5M3h3azIycmo0MG56YXptaXowYXQifQ.Ea8GhyxmTIdHhgUFYNi5TA'
          onViewportChange={newViewport => setViewport(newViewport)}
          {...viewport}
          onClick={handleMapClick}
        >
          <div className={classes.navigationControl}>
            <NavigationControl
              onViewportChange={newViewport => setViewport(newViewport)}
            />
          </div>
          {/* Pin for user location */}

          {userPosition && (
            <Marker
              latitude={userPosition.latitude}
              longitude={userPosition.longitude}
              offsetLeft={40}
              offsetTop={-37}
            >
              <PlaceTwoTone size={40} color='white' />
            </Marker>
          )}

          {/* Draft pin */}

          {state.draft && (
            <Marker
              latitude={state.draft.latitude}
              longitude={state.draft.longitude}
            >
              <PlaceTwoTone size={40} color='grey' />
            </Marker>
          )}
        </ReactMapGL>

        <Blog />
      </div>
    </>
  );
};

const styles = {
  root: {
    display: 'flex'
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  navigationControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '1em'
  },
  deleteIcon: {
    color: 'red'
  },
  popupImage: {
    padding: '0.4em',
    height: 200,
    width: 200,
    objectFit: 'cover'
  },
  popupTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
};

export default withStyles(styles)(Map);
