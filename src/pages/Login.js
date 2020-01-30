import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../components/loginForm';
import RegisterForm from '../components/RegisterForm';

class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
			  checked: true,
		  };
  }
  componentDidMount(){		
    console.log(this.state.checked);
  }
  
  updateState(){

	this.setState({checked: !this.state.checked})

	console.log('parent');
	this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
	
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  render() {

    const variavel = (this.state.checked) ? <LoginForm updateState={this.changePage}/> : <RegisterForm/>;
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
            {variavel}
           
        	<Grid container style={{paddingLeft: '32px',paddingRight: '32px'}}>
		   		{/* {text} */}
       		</Grid> 
           
        </div>
      
      </Container>
    );
  }
}export default (Login);