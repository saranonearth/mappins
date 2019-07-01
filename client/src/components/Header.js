import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Context from '../context';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MapIcon from '@material-ui/icons/Map';
import Typography from '@material-ui/core/Typography';
import Signout from '../components/Auth/Signout';

const Header = ({ classes }) => {
  const { state } = useContext(Context);
  const { currentUser } = state;

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <MapIcon className={classes.icon} />
          <div>
            <Typography
              component='h1'
              varient='h6'
              color='inherit'
              noWrap
              style={{ fontWeight: '400', fontSize: '2em' }}
            >
              {' '}
              Mappins{' '}
            </Typography>
          </div>
          {currentUser && (
            <div className={classes.grow}>
              <img
                className={classes.picture}
                src={currentUser.picture}
                alt={currentUser.name}
              />
              <Typography varient='h5' color='inherit' noWrap>
                {' '}
                {currentUser.name}{' '}
              </Typography>
            </div>
          )}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: 'white',
    fontSize: 45
  },
  mobile: {
    display: 'none'
  },
  picture: {
    height: '40px',
    borderRadius: '90%',
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Header);
