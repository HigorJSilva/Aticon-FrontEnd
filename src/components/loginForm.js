import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      
    },
    input:{
        width:'100%',
         margin: theme.spacing(1, 0, 1),
    },
    submit: {
        width:'100%',
        margin: theme.spacing(1, 0, 2),
      },
   
  });

  
  
 
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            mensagem:'',
        };
    }
 
    handleChange = (event) => {
        // const {email, senha} = event.target;
        this.setState( {[event.target.name]: event.value});
    }
 
    handleSubmit = () => {
       console.log('aa');
    }
    
 
    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.container}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box>
                    {this.state.mensagem}
                </Box>
                
            </Box>
        );
    }
}export default withStyles(styles)(Login);