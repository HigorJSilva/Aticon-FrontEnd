import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {config} from '../../_helpers/config'
import api from '../../services/api';
import Swal from 'sweetalert2';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
		marginLeft: theme.spacing(1),
		width: '96%',
	  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
	state = {
		nome: "",
		CPF: "",
		matriz: "",
		email: "",
		senha: "",

		emailErro: "",
		senhaErro: "",
		CPFErro: "",
	  };


	onSubmit(e){
		e.preventDefault();
		let response = this.validate()
		if(response.success){
			console.log(response.success)
			const newPost = new FormData();
			newPost.append('nome', this.state.nome);
			newPost.append('CPF', this.state.CPF);
			newPost.append('matriz', this.state.matriz);
			newPost.append('email', (this.state.email).toLocaleLowerCase());
			newPost.append('senha', this.state.senha);
			api.post('/register',newPost).then(function(result) {
				if(result.data.success){
					Swal.fire('Cadastro realizado','Você pode realizar já pode realizar o login','success').then(
						(result) => {
							if (result.value) {
								window.location.href='/'
							}
						}
					)

				}else{
					Swal.fire('Houve algo de errado',result.data.message,'error')

				}

			});	
		}else{
			console.log(response)
			Swal.fire('Houve algo de errado',response.message,'error')
		}
	
	}

	validate(){
		const validarCpf = require('validar-cpf');
		this.setState( {emailErro: '', senhaErro:'', CPFErro:''} );
		let response = {
			success: true,
			message: ''
		} 
		if (this.state.email.length === 0 || this.state.senha.length === 0 || this.state.nome.length === 0
			|| this.state.matriz.length === 0 || this.state.CPF.length === 0 ) {
				
			response.success = false; 
			response.message = 'Preencha todos os campos';
			return response
		}

		if ( !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(this.state.senha))){
			response.success = false; 
			response.message = 'Algum(ns) campo(s) falharam a validação';
			this.setState({senhaErro: 'A senha precisa conter mais de 7 digitos, uma letra maiúscula e um número'})
		}

		if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))){
			response.success = false; 
			this.setState({emailErro: 'Email inválido. Digite um email no formato email@email.com'})
			response.message = 'Algum(ns) campo(s) falharam a validação';
		}

		if (!validarCpf(this.state.CPF)){
			response.success = false; 
			this.setState({CPFErro: 'CPF inválido. Digite um CPF válido'})
			response.message = 'Algum(ns) campo(s) falharam a validação';
		}

		return response;
	}

	change = e => {
		this.setState({
		  [e.target.name]: e.target.value
		});
	}

  render() {

  const { classes } = this.props;
 
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Registre-se
			</Typography>
			<form className={classes.form} noValidate>
				<Grid container spacing={2}>

					<Grid item xs={12}  style={{marginBottom:'-8px'}}>
						<TextField
						autoComplete="nome"
						name="nome"
						variant="outlined"
						required
						fullWidth
						id="nome"
						label="Nome Completo"
						onChange={e => this.change(e)}
						autoFocus
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
						variant="outlined"
						required
						fullWidth
						name="CPF"
						label="CPF"
						type="number"
						id="CPF"
						error={this.state.CPFErro}
				        helperText={this.state.CPFErro}
						onInput={(e)=>{ 
							e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,11)
						}}
						onChange={e => this.change(e)}
						/>
					</Grid>

					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Matriz *</InputLabel>
						<Select
						labelId="demo-simple-select-outlined-label"
						id="matriz"
						name='matriz'
						required
						fullWidth
						label="Matriz"
						onChange={e => this.change(e)}
						>

							<MenuItem value= '' disabled >Selecione uma matriz</MenuItem>
							
						{config.matrizes.map((e, keyIndex) => {
							return (<MenuItem key={keyIndex} value={e.ano}>{e.ano}</MenuItem>);
						})}
						</Select>
             		 </FormControl>

					<Grid item xs={12}>
						<TextField
						variant="outlined"
						required
						fullWidth
						id="email"
						label="Email"
						placeholder='Exemplo@gmail.com'
						error={this.state.emailErro}
				        helperText={this.state.emailErro}
						name="email"
						autoComplete="email"
						onChange={e => this.change(e)}
						/>
					</Grid>
					<Grid item xs={12} style={{marginTop:'-8px'}}>
						<TextField
						variant="outlined"
						required
						fullWidth
						name="senha"
						label="Senha"
						error={this.state.senhaErro}
				        helperText={this.state.senhaErro}
						type="password"
						id="senha"
						onChange={e => this.change(e)}
						/>
					</Grid>
            	</Grid>

				<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={e => this.onSubmit(e)}
				>
              		Registrar 
            	</Button>
				<Grid container justify="flex-end">
					<Grid item>
						<Link href="/login" variant="body2">
						Já tem uma conta? Faça o login
						</Link>
					</Grid>
				</Grid>
          </form>
        </div>
        {/* <Box mt={8}>
        </Box> */}
      </Container>
    );
  }
}
export default withStyles(styles) (SignUp)