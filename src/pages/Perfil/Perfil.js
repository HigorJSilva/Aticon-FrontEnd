import React, { Component } from 'react';
import {withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api';
import 'typeface-roboto';
import '../../styles/modal.css';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';


const styles = theme => ({
    container: {
		// display: 'flex',
		width: '80%',
		margin: '0 auto',
		marginTop:'20px',
		backgroundColor: '#F7F7F7',
		position: 'relative',
		
	},
	details:{
		padding:'10px',
		width:'68%'
	},
});


class Perfil extends Component {

	constructor(props) {
		super(props);
		let newUser = (JSON.parse(this.localStorage.getItem('jtwToken'))).user
        this.state = {
			user:newUser,
			senhaAtual:'',
			novaSenha: "",
			confirmaSenha:'',
	
			senhaAtualErro: "",
			novaSenhaErro: "",
			confirmaSenhaErro: "",
		};
		

	  }

	  localStorage = window.localStorage;

	async getDados(){
		
	}

	componentDidMount(){		
		this.getDados();
		
	}

	componentDidUpdate(){		
		this.getDados();
	}

	change = e => {
		this.setState({
		  [e.target.name]: e.target.value
		});
	}

	onChangeData(){
		window.location.href='/alterarDados'
	}

	async onSubmitSenha(e){
		e.preventDefault();
		let response = this.validate()
		if(response.success){
			const newPost = new FormData();
			newPost.append('senhaAtual', this.state.senhaAtual);
			newPost.append('novaSenha', this.state.novaSenha);

			await api.post('/alterarSenha',newPost).then(function(result) {
				if(result.data.success){
					Swal.fire('Senha Alterada','Suas credenciais foram alteradas','success').then((result) => {
						if (result.value) {
							window.location.reload(false);
						}
					})
				}
				else{
					Swal.fire('Houve algo de errado',result.data.message,'error')
				}
			})
		}
		else{
			Swal.fire('Houve algo de errado',response.message,'error')
		}
	}

	normalise = value => (value * 100) / this.state.cargaHoraria;

	validate(){
	
		this.setState( {senhaAtualErro: '', novaSenhaErro:'', confirmaSenhaErro:''} );

		let response = {
			success: true,
			message: ''
		} 
		if (this.state.senhaAtual.length === 0 || this.state.novaSenha === 0 ) {
				
			response.success = false; 
			response.message = 'Preencha todos os campos';
			return response
		}

		if ( !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(this.state.senhaAtual))){
			response.success = false; 
			response.message = 'Algum(ns) campo(s) falharam a validação';
			this.setState({senhaAtualErro: 'A senha atual possui mais de 7 digitos, uma letra maiúscula, uma letra minúscula e um número'})
		}
		if ( !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(this.state.novaSenha))){
			response.success = false; 
			response.message = 'Algum(ns) campo(s) falharam a validação';
			this.setState({novaSenhaErro: 'A nova senha precisa ter mais de 7 digitos, uma letra maiúscula, uma letra minúscula e um número'})
		}
		console.log(!(this.state.confirmaSenha === this.state.novaSenha))
		if ( !(this.state.confirmaSenha === this.state.novaSenha)){
			response.success = false; 
			response.message = 'Algum(ns) campo(s) falharam a validação';
			this.setState({novaSenhaErro: 'As senhas inseridas não conhecidem'})
			this.setState({confirmaSenhaErro: 'As senhas inseridas não conhecidem '})
		}

		return response;
	}
  render() {
	const { classes } = this.props;
	
    return (
		
        <React.Fragment>
			
        	<CssBaseline  />
			<div style={{background: '#F7F7F7'}}>
        <Grid container spacing={3} className={classes.container}  >

			<Grid item xs={12}>
				<Typography variant={'h4'} color={'secondary'} weight={300} bottomspace={'small'}>
					Meus Dados
				</Typography>

				<Typography color={'textSecondary'} style={{ marginLeft: '20px'} } bottomspace={'small'}>
					Atualize seus dados
				</Typography>
			</Grid>

			<Paper className={classes.details}>
				<Grid container spacing={3}>
				
					<Grid item xs={12} sm={6}>

							<Typography color={'textSecondary'} style={{display: 'inline-block'}} weight={300} bottomspace={'small'}>
								Nome: &nbsp;
							</Typography>

							<Typography color={'textPrimary'} style={{display: 'inline-block'}}bottomspace={'small'}>
							{this.state.user.nome}
							</Typography>

					</Grid>	
				

					<Grid item xs={12} sm={6}>

							<Typography color={'textSecondary'} style={{display: 'inline-block'}} weight={300} bottomspace={'small'}>
								Matriz: &nbsp;
							</Typography>

							<Typography color={'textPrimary'} style={{display: 'inline-block'}} bottomspace={'small'}>
							{this.state.user.matriz}
							</Typography>
					</Grid>	

					<Grid item xs={12} sm={6}>
							<Typography color={'textSecondary'} style={{display: 'inline-block'}} weight={300} bottomspace={'small'}>
								CPF: &nbsp;
							</Typography>

							<Typography color={'textPrimary'} style={{display: 'inline-block'}}bottomspace={'small'}>
							{this.state.user.CPF}
							</Typography>
					</Grid>	

					<Grid item xs={12} sm={6}>
							<Typography color={'textSecondary'} style={{display: 'inline-block'}} weight={300} bottomspace={'small'}>
								Email: &nbsp;
							</Typography>

							<Typography color={'textPrimary'} style={{display: 'inline-block'}} bottomspace={'small'}>
							{this.state.user.email}
							</Typography>

					</Grid>	

					<Grid item xs={12} sm={12}>
						<Button  color='primary' variant='outlined' style={{width:'100%'}} onClick={() => this.onChangeData()}
						> Alterar dados</Button>
					</Grid>
				</Grid>	
			</Paper>

			<Grid item xs={12}>
				<Typography variant={'h5'} color={'secondary'} weight={300} bottomspace={'small'}>
					Alteração de senha
				</Typography>

			</Grid>	

			<Paper className={classes.details}>
				<Grid container spacing={3} >
				
					<Grid item xs={12} >

							<Typography color={'textPrimary'} style={{display: 'inline-block'}} weight={300} bottomspace={'small'}>
								Senha Atual: &nbsp;
							</Typography>
				
						<TextField
								required
								fullWidth
								name="senhaAtual"
								variant="outlined"
								type='password'
								id="senhaAtual"
								// label="Senha Atual"
								value={this.state.senhaAtual}
								onChange={e => this.change(e)}
								error={this.state.senhaAtualErro}
								helperText={this.state.senhaAtualErro}
								
							/>
					</Grid>	

					<Grid item xs={12}>

							<Typography color={'textPrimary'} style={{display: 'inline-block'}} weight={300} bottomspace={'small'}>
								Nova senha: &nbsp;
							</Typography>

							<TextField
								required
								fullWidth
								name="novaSenha"
								variant="outlined"
								type='password'
								id="novaSenha"
								// label="Nova senha"
								value={this.state.novaSenha}
								onChange={e => this.change(e)}
								error={this.state.novaSenhaErro}
								helperText={this.state.novaSenhaErro}
							/>
					</Grid>	
					<Grid item xs={12}>

							<Typography color={'textPrimary'} style={{display: 'inline-block'}} weight={300} bottomspace={'small'}>
								Confirme a Nova senha: &nbsp;
							</Typography>

							<TextField
								required
								fullWidth
								name="confirmaSenha"
								variant="outlined"
								type='password'
								id="confirmaSenha"
								// label="Nova senha"
								value={this.state.confirmaSenha}
								onChange={e => this.change(e)}
								error={this.state.confirmaSenhaErro}
								helperText={this.state.confirmaSenhaErro}
							/>
					</Grid>	

					
					<Grid item xs={12} sm={12}>
						<Button  color='primary' variant='outlined' style={{width:'100%'}}  onClick={e => this.onSubmitSenha(e)}
						> Salvar Nova Senha</Button>
					</Grid>
				</Grid>	
			</Paper>

		</Grid>

		</div>
    </React.Fragment>);
  }
}
export default withStyles(styles)(Perfil);