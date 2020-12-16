import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
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
//TODO: mudar os cookies em caso de alteração
class SignUp extends Component {
    constructor(props) {
        super(props);
        let newUser = (JSON.parse(this.localStorage.getItem('jtwToken'))).user
		
        this.state = {
            nome: newUser.nome,
            CPF: newUser.CPF,
            matriz: newUser.matriz,

            CPFErro: "",
        };
    }
    localStorage = window.localStorage;


	onSubmit(e){
		e.preventDefault();
        let response = this.validate()
        const sessionStore = (newUser) => this.saveJwt(newUser)
		if(response.success){
			const newPost = new FormData();
			newPost.append('nome', this.state.nome);
			newPost.append('CPF', this.state.CPF);
			newPost.append('matriz', this.state.matriz);
			api.post('/alterarDados',newPost).then(function(response) {
               
				if(response.data.success){
                    const newUser = response.data.data
					Swal.fire('Dados atualizados','Seus dados foram atualizados','success').then(
						(result) => {
							if (result.value) {
                                sessionStore(newUser)

                                window.location.href='/perfil'                           
							}
						}
					)

				}else{
					Swal.fire('Houve algo de errado',response.data.message,'error')

				}

			});	
		}else{
			Swal.fire('Houve algo de errado',response.message,'error')
		}
	
    }

    saveJwt(user){
        console.log(user);
        let obj = { user }
        console.log(obj)
        this.localStorage.removeItem('jtwToken')
        localStorage.setItem('jtwToken', JSON.stringify(obj));

    }

	validate(){
		const validarCpf = require('validar-cpf');
		this.setState( { CPFErro:''} );
		let response = {
			success: true,
			message: ''
        }
         
        if ( this.state.nome.length === 0|| this.state.matriz.length === 0 || 
            this.state.CPF.length === 0 ) {
				
			response.success = false; 
			response.message = 'Preencha todos os campos';
			return response
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
				<PersonOutlineIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Informações do Perfil
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
                        value={this.state.nome}
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
                        value={this.state.CPF}
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
                        value={this.state.matriz}
						onChange={e => this.change(e)}
						>

							<MenuItem value= '' disabled >Selecione uma matriz</MenuItem>
							
						{config.matrizes.map((e, keyIndex) => {
							return (<MenuItem key={keyIndex} value={e.ano}>{e.ano}</MenuItem>);
						})}
						</Select>
             		 </FormControl>
            	</Grid>

				<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={e => this.onSubmit(e)}
				>
              		Salvar Alterações 
            	</Button>
          </form>
        </div>
        {/* <Box mt={8}>
        </Box> */}
      </Container>
    );
  }
}
export default withStyles(styles) (SignUp)