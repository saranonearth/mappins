import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExploreIcon from '@material-ui/icons/Explore';
import Typography from '@material-ui/core/Typography';

const NoContent = ({ classes }) => (
  <div className={classes.root}>
    <ExploreIcon className={classes.icon} />

    <Typography noWrap align='center' color='textPrimary'>
      Click on the map to pin a location
    </Typography>
  </div>
);

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '16px'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: '40px'
  }
});

export default withStyles(styles)(NoContent);
