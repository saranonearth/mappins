import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
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
  const [viewport, setViewport] = useState(initialViewport);
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
    });
  };
  console.log(initialViewport);
  return (
    <>
      <div className={classes.root}>
        <ReactMapGL
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxApiAccessToken='pk.eyJ1Ijoic2FyYW5vbmVhcnRoIiwiYSI6ImNqeGp5M3h3azIycmo0MG56YXptaXowYXQifQ.Ea8GhyxmTIdHhgUFYNi5TA'
          onViewportChange={newViewport => setViewport(newViewport)}
          {...viewport}
        />
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
