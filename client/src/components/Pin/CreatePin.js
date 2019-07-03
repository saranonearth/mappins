import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import Context from '../../context';
import axios from 'axios';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';

const CreatePin = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'mappins');
    data.append('cloud_name', 'saranonearth');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/saranonearth/image/upload',
      data
    );

    return res.data.url;
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      setSubmitting(true);

      const url = await handleImageUpload();

      const { latitude, longitude } = state.draft;

      const variables = { title, image: url, content, latitude, longitude };
      await client.request(CREATE_PIN_MUTATION, variables);

      discardPin();
    } catch (error) {
      setSubmitting(false);
      console.log('Error creating pin', error);
    }
  };

  const discardPin = () => {
    setTitle('');
    setImage('');
    setContent('');
    dispatch({
      type: 'DELETE_DRAFT'
    });
  };

  return (
    <form className={classes.form}>
      <Typography className={classes.alignCenter}> Pin Location</Typography>
      <div>
        <TextField
          onChange={e => setTitle(e.target.value)}
          name='title'
          label='Titile'
          placeholder='Insert pin title'
        />

        <input
          accept='image/*'
          id='image'
          type='file'
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor='image'>
          <Button
            style={{ color: image && 'green' }}
            component='span'
            size='small'
            className={classes.button}
          >
            {' '}
            <AddAPhotoIcon />{' '}
          </Button>
        </label>
      </div>
      <div className={classes.content}>
        <TextField
          onChange={e => setContent(e.target.value)}
          name='content'
          label='Content'
          multiline
          rows='6'
          margin='normal'
          fullWidth
          variant='outlined'
        />
      </div>
      <div>
        <button
          onClick={e => handleSubmit(e)}
          disabled={!title.trim() || !content.trim() || !image || submitting}
          type='submit'
          className='btn'
        >
          Submit
        </button>
        <button onClick={discardPin} className='btn-rmd'>
          Remove Draft Pin
        </button>
      </div>
    </form>
  );
};

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%'
  },
  input: {
    display: 'none'
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);
