import React from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const validarCpf = require('validar-cpf');

const styles = theme => ({
    container: {
    display: 'flex',
      flexWrap: 'wrap',
      width: '35%',
      margin: '0 auto',
      marginTop:'50px',
    //   backgroundColor: '#ECECEC',
	  padding: '20px',
	  borderRadius:'15%'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
	  width: '100%',
	//   backgroundColor:"#fff"
    },
    hide: {
      width: '20%',
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
      margin: '20px',
	  width: '100%',
	  borderRadius:'15'
    },
    header:{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    },
  });

  
const valores = [
    {
      value: '2009/1',
      label: '2009/1',
    },
    {
		value: '2015/1',
		label: '2015/1',
    },
    {
		value: '2019/1',
		label: '2019/1',
    },

  ];
class Form extends React.Component {
  state = {
    nome: "",
    cpf: "",
	email: "",
	matriz:"",

	textoNomeErro: "",
	textoCpfErro: "",
    textoEmailErro: "",
    textoMatrizErro: "",
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () =>{
    let isError = false;
    const errors = {
    textoNomeErro: "",
    textoCpfErro: "",
	textoEmailErro: "",
	textoMatrizErro: "",
    };

    if (this.state.nome.length === 0) {
      isError = true;
      errors.textoNomeErro = "Nome é obrigatório";
    }

    if (this.state.cpf.length === 0) {
        isError = true;
        errors.textoCpfErro = "CPF é obrigatório";
	}
	if (validarCpf(this.state.cpf)) {
        isError = true;
        errors.textoCpfErro = "CPF inválido";
    }

    if (this.state.email.length === 0) {
        isError = true;
        errors.textoEmailErro = "Email é obrigatório";
    }

    if (this.state.matriz.length === 0) {
        isError = true;
        errors.textoMatrizErro = "Matriz é obrigatória";
    }


    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const erro = this.validate();
    
    if(!erro){  
          
        // //limpar formulário
        this.setState({
            nome: "",
			cpf: "",
			email: "",
			matriz:"",

			textoNomeErro: "",
			textoCpfErro: "",
			textoEmailErro: "",
			textoMatrizErro: "",
        });
         this.props.onSubmit(this.state);
    }
  };

  render() {  
    const { classes } = this.props;
    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit="" >
		<div className={classes.header} >
			<Typography variant="h4" component="h2">
				Cadastro
			</Typography>
		</div>

		<TextField
            required
            value={this.state.nome}
            name="nome"    
            label="Nome"
			placeholder="Nome Completo"
            className={classes.textField}
            helperText={this.state.textoNomeErro}
            margin="normal"
            onChange={e => this.change(e)}
            error ={this.state.textoNomeErro.length === 0 ? false : true }
        />

		<TextField
            required
            value={this.state.cpf}
            name="cpf"    
            label="CPF"
			placeholder="CPF"
            className={classes.textField}
            helperText={this.state.textoCpfErro}
            margin="normal"
            onChange={e => this.change(e)}
            error ={this.state.textoCpfErro.length === 0 ? false : true }
        />

		<TextField
            required
            value={this.state.email}
            name="email"
			label="Email"
			placeholder="Email"
			className={classes.textField}
			margin="normal"
			helperText={this.state.textoNomeErro}
            error ={this.state.textoEmailErro.length === 0 ? false : true }
            onChange={e => this.change(e)}
        />
        
      <TextField
			required
			select
            value={this.state.matriz}
            name="matriz"
      		label="Matriz"
			placeholder="Matriz"
          	className={classes.textField}
            margin="normal"
            onChange={e => this.change(e)}
            error ={this.state.textoMatrizErro.length === 0 ? false : true }
            helperText={this.state.textoMatrizErro}
        > 
		{valores.map(option => (
            <MenuItem key={option.value} value={option.value}>
            	{option.label}
            </MenuItem>
          ))}
		</TextField>
      
        
        <Button  buttonStyle={{ borderRadius: 50 }} style={{borderRadius:50}} type="submit" onClick={e => this.onSubmit(e)}  variant="contained" size="medium" 
        color="primary" className={classes.button}>
			Salvar
		</Button>

      </form>

    );
  }
}
export default withStyles(styles)(Form);