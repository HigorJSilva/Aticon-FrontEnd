import React, { Component } from 'react';
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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

class New extends Component {
    state = {
        imagem: null,
        descricao: '',
        modalidade: '',
        presencial: '',
		horasCertificado: '',
		id: null
	}
	componentDidMount(){
		if(this.props.match.params.id){
			this.setEvento()
		}
	}
	setEvento = async e =>{
		const newEvento = await api.get(`/eventos/edit/${this.props.match.params.id}`)
		this.setState({id: newEvento.data._id, descricao: newEvento.data.descricao, modalidade: newEvento.data.modalidade,
			presencial: newEvento.data.presencial, horasCertificado: newEvento.data.horasCertificado	 })
		console.log(newEvento.data)
	}


    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();

        data.append('imagem', this.state.imagem);
        data.append('descricao', this.state.descricao);
        data.append('modalidade', this.state.modalidade);
        data.append('presencial', this.state.presencial);
        data.append('horasCertificado', this.state.horasCertificado);

		const redirect = this.props.history;
		if(!this.state.id){
			await api.post('/eventos/new', data).then(function(result) {
				if(result.data.success){
					swal.fire({
						icon: 'success',
						title: 'Evento cadastrado',
						text: 'Deseja cadastrar outro?',
						showCancelButton: true,
						cancelButtonText: 'Não',
						confirmButtonText: 'Sim'
					}).then((result) => {
							if (result.value) {
								window.location.reload(false);
							}
							else{
								redirect.push('/eventos')
							}
						})
				}
				else{
					swal.fire(
						'Houve algo de errado!',
						result.data.message,
						'error'
					)
				}
			});
		}else{
			await api.post(`/eventos/edit/${this.state.id}`, data).then(function(result) {
				if(result.data.success){
					swal.fire({
						icon: 'success',
						title: 'Evento alterado',
					})
					redirect.push('/eventos')
				}else{
					swal.fire(
						'Houve algo de errado!',
						result.data.message,
						'error'
					)
				}
				
				
			});
		}

		    
	
    }

    handleImageChange = e => {
        this.setState({ imagem: e.target.files[0] });
    }

    handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
    }

    render() {
		const { classes } = this.props;
		const titulo = (this.state.id) ? "Alterar Evento": "Cadastrar Evento" 
		
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
                    id="descricao"
                    label="Descrição do evento"
                    placeholder='Descrição do evento'
                    name="descricao"
                    value={this.state.descricao}
					onChange={e => this.handleChange(e)}
					multiline
                    
                    // error={this.state.emailErro}
                    // helperText={this.state.emailErro}

                    FormHelperTextProps={{ classes: { root: classes.helperText } }}
                    
                            
                            
                />
				<FormControl variant="outlined" className={classes.formControl}>

					<InputLabel id="demo-simple-select-outlined-label">Modalidade *</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="modalidade"
						name='modalidade'
						required
						fullWidth
					    value={this.state.modalidade}
					
						onChange={e => this.handleChange(e)}
						label="Modalidade"
					>
						<MenuItem value={'I'}>Módulo I</MenuItem>
						<MenuItem value={'II'}>Módulo II</MenuItem>
						<MenuItem value={'III'}>Módulo III</MenuItem>
					</Select>

				</FormControl>

				<FormControl variant="outlined" className={classes.formControl} 
				style={{marginTop:'10px', marginBottom:'-5px'}}>
					
					<InputLabel id="demo-simple-select-outlined-label">Regime *</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="regime"
						name='presencial'
						required
						fullWidth
					  	value={this.state.presencial}
					
						onChange={e => this.handleChange(e)}
						label="Regime"
					>
						<MenuItem value={true}>Presencial</MenuItem>
						<MenuItem value={false}>A distância</MenuItem>

					</Select>

				</FormControl>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="horasCertificado"
                    label="Horas do Certificado"
                    type="number"
                    id="horasCertificado"
					value={this.state.horasCertificado}
					InputProps={{
						inputProps: { 
							max: 40, min: 2
						}
					}}
                    onChange={e => this.handleChange(e)}
                    // error={this.state.senhaErro}
                    // helperText={this.state.senhaErro}
                    FormHelperTextProps={{ classes: { root: classes.helperText } }}
                    
                />
                <InputLabel id="demo-simple-select-outlined-label">Imagem *</InputLabel>
                <input type="file" name="imagem" onChange={this.handleImageChange}></input>

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

export default withStyles(styles)(New);