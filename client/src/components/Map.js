import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import PlaceTwoTone from './PinIcon';
import { withStyles } from '@material-ui/core/styles';
import Context from '../context';
import Blog from './Blog';
import { useClient } from '../client';
import { GET_PINS_QUERY } from '../graphql/queries';
import { DELETE_PIN_MUTATION } from '../graphql/mutations';
import { Subscription } from 'react-apollo';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import Button from '@material-ui/core/Button';
import {
  PIN_ADDED_SUBSCRIPTION,
  PIN_UPDATED_SUBSCRIPTION,
  PIN_DELETED_SUBSCRIPTION
} from '../graphql/subscriptions';
// import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';

const initialViewport = {
  width: '100%',
  height: '91vh',
  latitude: 10.799634,
  longitude: 78.709643,
  zoom: 11
};

const Map = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    getPins();
  }, [getPins]);

  const [viewport, setViewport] = useState(initialViewport);
  const [userPosition, setUserPosition] = useState(null);
  const [popup, setPopup] = useState(null);
  //getpins
  const getPins = async () => {
    const { getPins } = await client.request(GET_PINS_QUERY);

    dispatch({
      type: 'GET_PINS',
      payload: getPins
    });
  };

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

  const highlightNewPin = pin => {
    const isNewPin =
      differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;

    return isNewPin ? 'red' : 'grey';
  };

  const handleSelectPin = pin => {
    setPopup(pin);
    dispatch({
      type: 'SET_PIN',
      payload: pin
    });
  };

  const isAuthUser = () => state.currentUser._id === popup.author._id;

  const handleDeletePin = async pin => {
    const variables = { pinId: pin._id };

    await client.request(DELETE_PIN_MUTATION, variables);

    setPopup(null);
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
              <PlaceTwoTone size={40} color='yellow' />
            </Marker>
          )}

          {/* Created Pins */}
          {state.pins.map(pin => (
            <Marker
              key={pin._id}
              latitude={pin.latitude}
              longitude={pin.longitude}
            >
              <PlaceTwoTone
                onClick={() => handleSelectPin(pin)}
                size={40}
                color={highlightNewPin(pin)}
              />
            </Marker>
          ))}

          {/* Pop box */}
          {popup && (
            <Popup
              anchor='top'
              latitude={popup.latitude}
              longitude={popup.longitude}
              closeOnClick={false}
              onClose={() => setPopup(null)}
            >
              <img
                src={popup.image}
                className={classes.popupImage}
                alt={popup.title}
              />
              <div className={classes.popupTab}>
                <p>{popup.title}</p>
              </div>
              {isAuthUser() && (
                <Button onClick={() => handleDeletePin(popup)}>
                  <DeleteIcon className={classes.deleteIcon} />
                </Button>
              )}
            </Popup>
          )}
        </ReactMapGL>
        {/* Subscription  */}

        <Subscription
          subscription={PIN_ADDED_SUBSCRIPTION}
          onSubscriptionData={({ subscriptionData }) => {
            const { pinAdded } = subscriptionData.data;
            console.log('WORKING');
            console.log(pinAdded);
            dispatch({
              type: 'CREATE_PIN',
              payload: pinAdded
            });
          }}
        />
        <Subscription
          subscription={PIN_UPDATED_SUBSCRIPTION}
          onSubscriptionData={({ subscriptionData }) => {
            const { pinUpdated } = subscriptionData.data;
            console.log(pinUpdated);
            dispatch({
              type: 'CREATE_COMMENT',
              payload: pinUpdated
            });
          }}
        />
        <Subscription
          subscription={PIN_DELETED_SUBSCRIPTION}
          onSubscriptionData={({ subscriptionData }) => {
            const { pinDeleted } = subscriptionData.data;
            console.log(pinDeleted);
            dispatch({
              type: 'DELETE_PIN',
              payload: pinDeleted
            });
          }}
        />
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
