import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
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
class RecupSenha extends Component {
    constructor(props) {
        super(props);
		
        this.state = {
            email:'',
        };
    }
    localStorage = window.localStorage;


	onSubmit(e){
		e.preventDefault();
		
			const newPost = new FormData();

			newPost.append('email',this.state.email)

			api.post('/esquecisenha',newPost).then(function(response) {
               
				if(response.data.success){
                    // const newUser = response.data.data
					Swal.fire('Email eviado','uma senha provisória foi enviada','success').then(
						(result) => {
							if (result.value) {
                                window.location.href='/login'                           
							}
						}
					)

				}else{
					Swal.fire('Houve algo de errado',response.data.message,'error')

				}

			});	
	
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
				<LockIcon />
			</Avatar>

			<Typography component="h1" variant="h5">
				Recuperação de Senha
			</Typography>

  
            
			<form className={classes.form} noValidate>
				<Grid container spacing={4}>

                    <Typography color="textSecondary" style={{ marginLeft: '3%' }}>  
                        Insira o e-mail cadastrado. Você receberá um senha temporária.</Typography>

					<Grid item xs={12}  style={{marginBottom:'-8px'}}>
						<TextField
						name="email"
						variant="outlined"
						required
						fullWidth
						id="email"
						label="Email"
                        onChange={e => this.change(e)}
						autoFocus
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
              		Enviar Senha
            	</Button>
          </form>
        </div>
        {/* <Box mt={8}>
        </Box> */}
      </Container>
    );
  }
}
export default withStyles(styles) (RecupSenha)