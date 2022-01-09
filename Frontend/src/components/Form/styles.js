import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      margin: 10,
    },
  },
  paper: {
    padding: "20px",
    borderRadius: '20px', 
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: '10px',
  },
  heading: {
    fontWeight: 'bolder'
  }
}));