import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        margin: '0 auto',
    }

});
class emptyEvents extends React.Component {
    render() {  
        const { classes } = this.props;
        return (
            <Box className={classes.container}>
                 <img src={window.location.origin + '/eventovazio.png'} alt="" />
                 <Typography color={'textSecondary'} style={{ marginLeft: '20px'} } variant="h5" bottomspace={'small'}>
			            Nenhum evento foi cadastrado. 
		        </Typography>
            </Box>
        );
    }

} export default withStyles(styles)(emptyEvents); 