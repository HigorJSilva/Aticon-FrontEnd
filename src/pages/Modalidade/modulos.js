import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import Modalidade from '../../components/modalidade';

import 'typeface-roboto';
import '../../styles/modal.css';



const styles = theme => ({
    container: {
		// display: 'flex',
		width: '80%',
		margin: '0 auto',
		marginTop:'20px',
		backgroundColor: '#F7F7F7',
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
		marginBottom: '8px',
		flexWrap: 'wrap',
	},

	card:{
		width: '30%',
		margin: '20px',
		'&:hover': {
			transform: 'translateY(-3px)',
			boxShadow: '0 4px 20px 4px rgba(0,0,0,0.12)',
			},
	},
});
class Modulos extends Component {
	constructor(props) {

        super(props);
        this.state= {
		}
	}

    render() {
        const { classes } = this.props;
        return (
           
            <React.Fragment>
                <CssBaseline  />
				<Box className={classes.container}>
					<Modalidade />
				</Box>
            </React.Fragment>
            
        );
    }

}export default withStyles(styles)(Modulos);