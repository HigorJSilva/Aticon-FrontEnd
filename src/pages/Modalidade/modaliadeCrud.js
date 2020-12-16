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

//TODO: tratamento de erro p/ campos vazios e invalidos
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

class New extends Component {
    state = {
        nome: null,
        atividades: [],
        cargaHorariaMax: '',
        cargaHorariaMin: '',
		id: null
    }
    
	componentDidMount(){
			this.setModalidade()
    }
    
	setModalidade = async e =>{

        const Modulo = await api.get(`/modulos/edit/${this.props.match.params.id}`)
        
		this.setState({id: Modulo.data._id, nome: Modulo.data.nome, cargaHorariaMax: Modulo.data.cargaHorariaMax,
            cargaHorariaMin: Modulo.data.cargaHorariaMin, atividades: Modulo.data.atividades	 })
            
		console.log(Modulo.data)
	}

    handleSubmit = async e => {
        e.preventDefault();

        console.log('this.state :>> ', this.state);
        if(this.state.cargaHorariaMax === '' || this.state.cargaHorariaMin === ''){
            swal.fire(
                'Houve algo de errado!',
                'Preencha todos os campos',
                'error'
            )
        }else{
            const data = new FormData();

            data.append('nome', this.state.nome);
            data.append('cargaHorariaMax', this.state.cargaHorariaMax);
            data.append('cargaHorariaMin', this.state.cargaHorariaMin);
            data.append('atividades', this.state.atividades);

            const redirect = this.props.history;
            await api.post('/modulos/edit/'+this.state.id, data).then(function(result) {
                if(result.data.success){
                    swal.fire({
                        icon: 'success',
                        title: 'Modulo Alterado',
                    }).then((result) => {
                            redirect.push('/modalidade')
                        })
                }
                else{
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
		const { classes } = this.props;
		const titulo = "Alterar Módulo"
		
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
                    // disabled
                    fullWidth
                    autoFocus
                    label="Módulo"
                    defaultValue='Módulo'
                    value={this.state.nome}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
				
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="cargaHorariaMax"
                    label="Carga horária Máxima em %"
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    id="cargaHorariaMax"
					value={this.state.cargaHorariaMax}
                    onChange={e => this.handleChange(e)}
                    
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="cargaHorariaMin"
                    label="Carga horária mínima em %"
                    type="number"
                    id="cargaHorariaMin"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
					value={this.state.cargaHorariaMin}
                    onChange={e => this.handleChange(e)}
                    
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={e => this.handleSubmit(e)}
                >
                    Aterar Módulo
                </Button>
                </form>
            </div>
        </Container>
	);
  };
}

export default withStyles(styles)(New);