import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    divider: {
        margin: '20px 0',
        textTransform: 'capitalize'
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
      },
}));