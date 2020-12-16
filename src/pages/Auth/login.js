import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import jsonWebTokenService from 'jsonwebtoken'
import { Redirect } from 'react-router-dom';
import {authenticationService} from '../../services/authenticationService'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  helperText:{
	  fontSize: 14
  }
});

class Login extends Component {
	state = {
		email: "",
		senha: "",
		emailErro: "",
		senhaErro: "",
		success: false,
		homePage:"/"
	};
	
	localStorage = window.localStorage;
	 
    change = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
	};
	 
	componentDidMount(){
		authenticationService.logout();
	}


	async onSubmit (e) {
		e.preventDefault();
		if(!this.validate()){

			let response = [];
			response = await authenticationService.login((this.state.email).toLocaleLowerCase(),this.state.senha)
			
			
			if(response.user){
				this.saveJwt(response.token);
				if(response.user.role === "Admin"){
        
          this.setState({homePage: "/dashboard"});
        }
				
        else{
          this.setState({homePage: "/atividades"});
        }
          
				this.setState({success: true})
			}
			else{
				this.setState( {emailErro: response.message} )
				console.log(response)
			}
		}
	}

	  validate(){

		this.setState( {emailErro: '', senhaErro:''} );

		let hasError = false;

		if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))){
			hasError = true; 
			this.setState( {emailErro: 'Email inválido'} );
		}

		if (this.state.email.length === 0) {
			hasError = true;
			this.setState( {emailErro: 'Email é obrigatório'} );
		}

		if (this.state.senha.length === 0) {
			hasError = true;
			this.setState( {senhaErro: 'Senha é obrigatória'} );
		}
		
		  return hasError;
	  }

	  async saveJwt (jwt) {
        try {  

            // const decodedJwt = jsonWebTokenService.decode(jwt)
			      await this.localStorage.setItem('jwtToken', jwt)
			
            // await this.localStorage.setItem('dados_usuario', JSON.stringify(decodedJwt))

            return true

        } catch (err) {

            if (err instanceof jsonWebTokenService.JsonWebTokenError) return false
              throw err
        }
  }
  
	
  render() {
    const { classes } = this.props;
    if (this.state.success) {
      console.log('object :>> ', this.state.homePage);
      return <Redirect to={this.state.homePage} />;
    }
    return (
      
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <form className={classes.form} noValidate>

            <TextField
                autoFocus
                required
                fullWidth
                autoComplete="off"
                type="email"
                variant="outlined"
                margin="normal"
                
                id="email"
                label="Email"
                placeholder='exemplo@email.com'
                name="email"
				
				        onChange={e => this.change(e)}
				
                error={this.state.emailErro}
				        helperText={this.state.emailErro}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                        
                        
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="senha"
				label="Senha"
				type="password"
                id="password"
				
                onChange={e => this.change(e)}
				error={this.state.senhaErro}
				helperText={this.state.senhaErro}
				FormHelperTextProps={{ classes: { root: classes.helperText } }}
				  
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => this.onSubmit(e)}
            >
                Login
            </Button>
            <Grid container>
                <Grid item xs>
					<Link href="/esquecisenha" variant="body2">
						Esqueceu a senha?
					</Link>
                </Grid>
                <Grid item>
                <Link  href="/register" variant="body2">
                    {"Não tem conta? Inscreva-se"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
	);
  };
} export default withStyles(styles)(Login);