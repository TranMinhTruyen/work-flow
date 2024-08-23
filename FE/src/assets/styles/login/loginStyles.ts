import deepOrange from '@mui/material/colors/deepOrange';

const loginStyles = {
  header: {
    height: 70,
  },

  textTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
  },

  avatar: {
    width: 150,
    maxWidth: 150,
    height: 150,
    maxHeight: 150,
    bgcolor: deepOrange[500],
  },

  textInput: {
    width: 500,
    maxWidth: 500,
  },

  button: {
    width: 200,
    maxWidth: 200,
    height: 40,
    maxHeight: 40,
    backgroundColor: 'rgba(0, 170, 255, 0.8)',
  },

  footer: {
    display: 'flex',
    justifyContent: 'center',
    height: 70,
  },
};

export default loginStyles;
