import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '10px 14px 16px 4px rgba(0,0,0,0.26)'     
      },
      heading: {
        color: 'rgba(0,183,255, 1)',

      },
      image: {
        marginLeft: '15px',
        textShadow: '53px 1px 34px rgba(0,172,255,1)'
      },
      [theme.breakpoints.down('sm')]: {
        mainContainer: {
          flexDirection: "column-reverse"
        }
      }
}));