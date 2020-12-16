import React, { Component } from 'react';
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import EventIcon from '@material-ui/icons/Event';
import swal from 'sweetalert2';


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
	formControl: {
		// marginBotton: theme.spacing(1),
		width: '100%',
	  },
	  selectEmpty: {
		marginTop: theme.spacing(2),
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

class FAQCRUD extends Component {
    state = {
        titulo: '',
        tituloErro: '',
        resposta: '',
        repostaErro:'',
        id: null
	}
	componentDidMount(){
		if(this.props.match.params.id){
      this.setEvento()
		}
	}
	setEvento = async e =>{
    const newPergunta = await api.get(`/ajuda/edit/${this.props.match.params.id}`)
    this.setState({id: newPergunta.data._id, titulo: newPergunta.data.titulo, resposta: newPergunta.data.resposta })
	}

    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();

        data.append('titulo', this.state.titulo);
        data.append('resposta', this.state.resposta);

		    const redirect = this.props.history;
		if(!this.state.id){
			await api.post('/ajuda/new', data).then(function(result) {
				if(result.data.success){
					swal.fire({
						icon: 'success',
						title: 'Pergunta cadastada',
						text: 'Deseja cadastrar outra?',
						showCancelButton: true,
						cancelButtonText: 'Não',
						confirmButtonText: 'Sim'
					}).then((result) => {
							if (result.value) {
								window.location.reload(false);
							}
							else{
								redirect.push('/ajuda')
							}
						})
				}
				else{
					swal.fire(
						'Houve algo de errado!',
						'Preencha todos os campos e tente novamente',
						'error'
					)
				}
			});
		}else{
			await api.post(`/ajuda/edit/${this.state.id}`, data).then(function(result) {
				if(result.data.success){
					swal.fire({
						icon: 'success',
						title: 'Pergunta alterada',
					})
					redirect.push('/ajuda')
				}else{
					swal.fire(
						'Houve algo de errado!',
						'Tente novamente',
						'error'
					)
				}
				
				
			});
		}

    }

    handleChange = e => {
		  this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        let titulo='';
        const { classes } = this.props;

        (this.state.id) ?  titulo = 'Alterar Pergunta' :  titulo = 'Adicionar Pergunta' 

        return (
        <Container component="main" maxWidth="xs">
			
            <CssBaseline />
            <div className={classes.paper}>
			<Avatar className={classes.avatar}>
            <EventIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              {titulo}
            </Typography>

                <form className={classes.form} noValidate>

                <TextField
                    autoFocus
                    required
                    fullWidth
                    autoComplete="off"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    id="titulo"
                    label="Título da pergunta"
                    placeholder='Insira o título da pergunta'
                    name="titulo"
                    value={this.state.titulo}
                    onChange={e => this.handleChange(e)}
                    multiline
                    FormHelperTextProps={{ classes: { root: classes.helperText } }}   

                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="resposta"
                    label="Resposta da Pergunta"
                    value={this.state.resposta}
                    onChange={e => this.handleChange(e)}
                    error={this.state.respostaErro}
                    helperText={this.state.respostaErro}
                    multiline
                    FormHelperTextProps={{ classes: { root: classes.helperText } }}
                    
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={e => this.handleSubmit(e)}
                >
                   {titulo}
                </Button>
                </form>
            </div>
        </Container>
	);
  };
}

export default withStyles(styles)(FAQCRUD);