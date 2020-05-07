import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import api from '../services/api'

import '../styles/feed.css';

const styles = theme => ({
    container: {
		// display: 'flex',
		width: '80%',
		margin: '0 auto',
		marginTop:'20px',
		backgroundColor: '#F7F7F7',
		position: 'relative',
    },
    feed:{
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        margin: '0 auto',
    },
	filtrosContainer:{
		display: 'flex',
		flexDirection: 'row',
		width: '55%',
        margin: '0 auto',
        justifyContent: 'space-evenly',
	},
    

	card:{
		width: '30%',
		margin: '20px',
		'&:hover': {
			transform: 'translateY(-3px)',
			boxShadow: '0 4px 20px 4px rgba(0,0,0,0.12)',
			},
	},
});

class Feed extends Component{
    state={
        feed:[],
        modulo:'',
        regime:'',
    }
    
    async componentDidMount(){
        const response = await api.get('/eventos');
        this.setState({feed:response.data});
    }
    renderView(){
         if( this.state.feed.length <= 0){
             // return empty events
            return( 
            <Box style={{display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    margin: '0 auto',}}>
                <img src={window.location.origin + '/eventovazio.png'} alt="" />
                <Typography color={'textSecondary'} style={{ marginLeft: '20px'} } variant="h5" bottomspace={'small'}>
                    Nenhum evento foi cadastrado. 
                </Typography>
            </Box>)
        } 
        //return events
        return (
            this.state.feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <Typography  gutterBottom>
                                <span>{post.descricao}</span>
                            </Typography>
                            
                        
                            {/* <span className="place">{post.place}</span>                                                  */}
                        </div>
                        <Box className="displaytabs" style={{fontSize:'36px'}}>
                            <Chip
                                avatar={<Avatar><DashboardIcon /></Avatar>}
                                label={"Módulo "+post.modalidade}
                                color="primary"
                                

                            ></Chip>
                            <Chip
                            avatar={<Avatar><AccessTimeIcon /></Avatar>}
                                label={post.horasCertificado+" horas"}
                                color="primary"
                            />
                            <Chip
                            avatar={<Avatar><PersonIcon /></Avatar>}
                                label={post.presencial ? "Presencial" : "Distância"}
                                color="primary"

                            />
                        </Box>
                        
                        {/* <img src={more} alt="Mais"/>                         */}
                    </header>
                    <img src={api.defaults.baseURL+ '/files/eventos/' + post.imagem} alt="" />
                    <footer>
                        <div className="actions">
                    
                        </div>

                    

                        <p>
                    
                        </p>
                    </footer>

                </article>

                ) )
          );
    }

    change = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
    render(){
        const { classes } = this.props;


        return(
            <div>
            {/* <Drawer/> */}
            <Box className={classes.container}>
                {/* <Header/> */}
                <Typography variant={'h4'} color={'secondary'} weight={300} bottomspace={'small'}>
                    Eventos
  		        </Typography>

                <Typography color={'textSecondary'} style={{ marginLeft: '20px', marginTop: '10px'} } bottomspace={'small'}>
			       Encontre atividades para participar
		        </Typography>
                <Box>

                    <section id="post-list">
                    
                        {this.renderView()}
                    
                    </section>
                </Box>
            </Box>
            </div>
        );
    }
}

export default withStyles(styles) (Feed);

