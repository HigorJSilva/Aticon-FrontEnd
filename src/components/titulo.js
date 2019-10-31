import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
		width: '80%',
		margin: '0 auto',
		marginTop:'30px',
		backgroundColor: '#000180',
		position: 'relative',
	},
	progressoContainer:{
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		margin: '0 auto',
	},
	progressBar:{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: '8px'
    },
    fab:{
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
	card:{
		width: '30%',
		margin: '20px',
	},
});



class Index extends Component {
	constructor(props) {
        super(props);
        this.state = {
			modulo: [],
        };
    }
    render() {
        const { classes } = this.props;
    
        return (
            <React.Fragment>
                <Fab color="primary" aria-label="add" className={classes.fab}>
                    <AddIcon />
                </Fab>
                <CssBaseline  />
                <div style={{background: '#F7F7F7'}}>
                    <Box className={classes.container} >
                        <Typography variant="h3" gutterBottom>
                                Eventos
                        </Typography>
                     </Box>
                </div>
            </React.Fragment>);
    }
}
export default withStyles(styles)(Index);