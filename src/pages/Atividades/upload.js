import React, { Component } from "react";
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2'
import { Typography } from "@material-ui/core";


import api from '../../services/api';
import Fileinput from "../../components/uploadCertificados";

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginLeft:'20px',
		marginTop:'20px',
		background: '#F7F7F7'
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		marginLeft:' 20px',
		marginRight:'20px',
		display: 'flex',
    	justifyContent: 'space-between',
	},
	container:{
		padding: "10px",
	},
	typografy:{
			padding:'10px'
	},
	button:{
		marginLeft:' 20px',
		marginRight:'20px',
		display: 'flex',
    	justifyContent: 'space-between',
	}
	
});

class UploadFiles extends Component {

	constructor(props) {
		super(props);
		this.state = {
			atividades:[],
			arquivos:[],
			form:[],
		}

		this.handleFile = this.handleFile.bind(this)
	}

	componentDidMount(){		
		this.getDados();
	}
  
	async getDados(){
		const response = await api.get('/');
		this.setState({ atividades: response.data });
	}

	getChildState = () =>{
		this.certificadoState.current.handleSend();
	}

	handleFile(sendedFile){
		// console.log('sendedFile :>> ', sendedFile);

		var fileName = sendedFile.fileUploaded.name;
		var atividadeId = sendedFile.atividadeId;

		const atividadeCertificado = { "certificado" : fileName, 
		"atividadeId":  atividadeId }; 

		this.setState(prevState => ({
			arquivos: prevState.arquivos.concat(sendedFile.fileUploaded)
		}));
		
		this.setState(prevState => ({
			form: prevState.form.concat(atividadeCertificado)
		}));


	}

	handleSend(){
		// e.preventDefault();
		const swalClose = this.props.fechar;
		const onModalResponse = this.props.onModalResponse;

		const data = new FormData();
		for (let index = 0; index < this.state.arquivos.length; index++) {
			data.append("certificado[]", this.state.arquivos[index]/*,this.state.arquivos[index].name*/);
		}

		// console.log('data.get :>> ', data.get('certificado[]'));
		data.append('form', JSON.stringify(this.state.form));

		api.post('/certificados/send', data).then(function(result) {
		  	// console.log( result)
		  	if(result.data.success){
				Swal.fire({
					customClass: {
						container: 'my-swal'
					},
					// timer: 2000,
					icon: 'success',
					title: 'Certificados enviados',
					text: 'Agora é só aguardar a correção',
				}).then((response) => {
					onModalResponse(result.data.success);
					swalClose();
				  })
		  	}
		  	else{
			  Swal.fire({
				customClass: {
				  container: 'my-swal'
				},
				icon: 'error',
				title: 'Houve um erro',
				text: result.data.message,
			  })
			}
			  
		});	
	}

  	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Typography variant={'h4'} color={'secondary'} weight={300} bottomspace={'small'}>
					Envie os certificados
				</Typography>

				<Typography color={'textSecondary'} style={{ marginLeft: '20px'} } bottomspace={'small'}>
					Selecione o certificado para cada atividade
				</Typography>

				<Grid style={{marginTop:'10px',}} container spacing={2}>
					{this.state.atividades.map(atividade => (

					<Fileinput ref={this.certificadoState} key={atividade._id} atividade={atividade} classes={classes} handleFile = {this.handleFile}/>


					))}
				</Grid>
				<Grid style={{marginTop:'10px', width:'100%', display: 'flex', flexDirection:'row-reverse'}}>
					<Button className={classes.button} variant="contained" color="primary" onClick={ () => this.handleSend() }> Enviar Certificados</Button>
				</Grid>
			</div>
		)
	}
} export default withStyles(styles)(UploadFiles);