import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Context from '../../context';
import format from 'date-fns/format';
import CreateCommnet from '../Comment/CreateComment';
import Comments from '../Comment/Comments';

const PinContent = ({ classes }) => {
  const { state } = useContext(Context);
  const {
    title,
    content,
    author,
    createdAt,
    image,
    comments
  } = state.currentPin;
  return (
    <div className={classes.root}>
      <img src={image} alt='pin-img' />
      <h2 style={{ color: '#333', fontWeight: '900' }}>{title}</h2>
      <h4>{author.name}</h4>
      <p>{format(Number(createdAt), 'MMM Do, YYYY')}</p>
      <p>{content}</p>

      {/* Pin comments */}
      <CreateCommnet />
      <Comments comments={comments} />
    </div>
  );
};

const styles = theme => ({
  root: {
    padding: '1em 0.5em',
    textAlign: 'center',
    width: '100%'
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withStyles(styles)(PinContent);
