import React, { Component } from 'react';
import {lighten, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import {Card, CardContent} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tabela from '../components/Tabela';
import SendModal from '../components/CompletedModal';
import Drawer from '../components/Drawer';

import api from '../services/api';
import 'typeface-roboto';
import './modal.css';


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


class Index extends Component {

	constructor(props) {
        super(props);
        this.state = {
			modulo: [],
			checked: true,
		};
		// this.sweetAlert = this.sweetalertfunction.bind(this);
      }


	async getDados(){
		let response = [];
		response = await api.get('/modulos');
		this.setState({ modulo: response.data });
	}

	componentDidMount(){		
		this.getDados();
		
	}

	componentDidUpdate(){		
		this.getDados();
		
	}


  render() {
	const { classes } = this.props;
	
	const BorderLinearProgress = withStyles({
		root: {
		  height: 10,
		  backgroundColor: lighten('#009C4D', 0.5),
		  alignItems: 'center',
		  width: '102%'
		},
		bar: {
		  borderRadius: 20,
		  backgroundColor: '#009C4D',
		},
	  })(LinearProgress);
	 
	  

    return (
		
        <React.Fragment>
			
        	<CssBaseline  />
			<Drawer/>
			<div style={{background: '#F7F7F7'}}>
        <Box className={classes.container} >
			
		<Typography variant={'h4'} color={'secondary'} weight={300} bottomspace={'small'}>
    		Atividades
  		</Typography>
		  

		<Typography color={'textSecondary'} style={{ marginLeft: '20px'} } bottomspace={'small'}>
			Acompanhe seu progresso
		</Typography>
			<Box className={classes.progressoContainer}>
				
						<Card className={classes.card} >
							 <CardContent /*className={classes.concluido}  */>
								<Grid container spacing={2}>
         							<Grid item style={{padding: '0px'}}>
										<Typography  gutterBottom>
											Módulo I
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2} style={{padding: '0px'}}>
									<Grid item xs={12} >
										<Typography variant="h4">
										{this.state.modulo.modulo1} 
										{this.state.modulo.modulo1 === 1 || this.state.modulo.modulo1 === undefined  ? ' 0 horas' 
													: ' horas' }
										</Typography>
									</Grid>
									<Grid item xs={3} sm container style={{padding: '0px'}}>
										<Grid item xs container direction="column" spacing={2} style={{alignContent: 'flex-end',
									 justify:"flex-end"}}>
											<Grid item xs>
												<Typography variant="body2" gutterBottom>

													{this.state.modulo.modulo1 >= 45 ? '/105 horas max.' 
													: '/45 horas min.' }
													

												</Typography>
											
											</Grid>
										
										</Grid>
									</Grid>
								</Grid>

							</CardContent>
						</Card>

						<Card className={classes.card}>
							<CardContent >
								<Grid container spacing={2}>
         							<Grid item style={{padding: '0px'}}>
										<Typography className={classes.title} gutterBottom>
											Módulo II
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2} style={{padding: '0px'}}>
									<Grid item xs={12} >
										<Typography variant="h4">
										{this.state.modulo.modulo2} 
										{this.state.modulo.modulo2 === 1 || this.state.modulo.modulo2 === undefined  ? ' 0 horas' 
													: ' horas' } 
										</Typography>
									</Grid>
									<Grid item xs={3} sm container style={{padding: '0px'}}>
										<Grid item xs container direction="column" spacing={2} style={{alignContent: 'flex-end',
									 justify:"flex-end"}}>
											<Grid item xs>
												<Typography variant="body2" gutterBottom>

												{this.state.modulo.modulo2 >= 22.5 ? '/75 horas max.' 
													: '/22.5 horas min.' }		
												</Typography>
											
											</Grid>
										
										</Grid>
									</Grid>
								</Grid>

							</CardContent>
						</Card>

						<Card className={classes.card}>
							<CardContent /*className={classes.concluido}  */ >
								<Grid container spacing={2}>
         							<Grid item style={{padding: '0px'}}>
										<Typography className={classes.title} gutterBottom>
											Módulo III
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2} style={{padding: '0px'}}>
									<Grid item xs={12} >
										<Typography variant="h4">
										{this.state.modulo.modulo3} 
										{this.state.modulo.modulo3 === 1 || this.state.modulo.modulo3 === undefined  ? ' 0 horas' 
													: ' horas' }
										</Typography>
									</Grid>
									<Grid item xs={3} sm container style={{padding: '0px'}}>
										<Grid item xs container direction="column" spacing={2} style={{alignContent: 'flex-end',
									 justify:"flex-end"}}>
											<Grid item xs>
												<Typography variant="body2" gutterBottom>
													{this.state.modulo.modulo2 >= 22.5 ? '/75 horas max.' 
													: '/22.5 horas min.' }		

												</Typography>
											
											</Grid>
										
										</Grid>
									</Grid>
								</Grid>

							</CardContent>
						</Card>
						
						<Card className={classes.card}>
							<CardContent /*className={classes.concluido}  */>
								<Grid container spacing={2}>
         							<Grid item style={{padding: '0px'}}>
										<Typography className={classes.title} gutterBottom>
											% A distância
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2} style={{padding: '0px'}}>
									<Grid item xs={12} >
										<Typography variant="h4">
										{/* {this.state.modulo.presencial} */}
										{this.state.modulo.presencial === undefined  ? ' 0 %' 
													: this.state.modulo.presencial+' %'}
										</Typography>
									</Grid>
									<Grid item xs={3} sm container style={{padding: '0px'}}>
										<Grid item xs container direction="column" spacing={2} style={{alignContent: 'flex-end',
									 justify:"flex-end"}}>
											<Grid item xs>
												<Typography variant="body2" gutterBottom>
													/50%
												</Typography>
											
											</Grid>
										
										</Grid>
									</Grid>
								</Grid>

							</CardContent>
						</Card>
						
			</Box>
			<Box className={classes.progressBar}> 
			{/* <Grid container spacing={3} > */}
				<Grid item xs={10} style={{alignSelf: 'center'}} >
					<BorderLinearProgress variant="determinate"  color="secondary" value={
						(this.state.modulo.total !== undefined ) ? Number(this.state.modulo.total) : Number('0')
						} />
				</Grid>
				 <Grid item  style={{display: 'inline-block'}}> 
					<Typography variant="h4" style={{display: 'inline-block'}}>
					{
						(this.state.modulo.total !== undefined ) ? Number(this.state.modulo.total) : 0
						}
						</Typography>
						<Typography variant="body2" gutterBottom style={{display: 'inline-block'}}>
							/150
						</Typography>
					 </Grid>

			{/* <SendModal/> */}

			</Box>

			<Tabela/>
        </Box>
		</div>
    </React.Fragment>);
  }
}
export default withStyles(styles)(Index);