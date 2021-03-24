import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import swal from 'sweetalert2';
import IsolatedMenu from '../../components/IsolatedMenu';

import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';

import api from '../../services/api'

import '../../styles/feed.css';

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
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(12),
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
    constructor(props){
        super(props);
        this.state={
            feed:[],
            modulo:'',
            regime:'',
            role: '',
            anchorEl:null
        };
    }
    
    
    handleClick = (event) => {
      this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
      this.setState({anchorEl: null});
    };

    localStorage = window.localStorage;
    
    async componentDidMount(){
        const response = await api.get('/eventos');
        const cookie = JSON.parse( await this.localStorage.getItem('jtwToken'))

        this.setState({ feed: response.data, role: cookie.user.role});
    }

    async handleCreate(){
        window.location.href=`/eventos/criar/`
    }

    handleEdit(eventoId){
        window.location.href=`/eventos/editar/${eventoId}`
    }
    async handleDelete(eventoId){
        // this.handleClose()
        swal.fire({
            title: 'Deseja deletar o evento?',
            text: "Essa alteração não é reversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim'
          }).then( async (result) => {
            if (result.value) {
                await api.get(`/eventos/remove/${eventoId}`).then(function(result) {
                    if(result.data.success){
                        swal.fire(
                            'Evento Deletado',
                            'O evento foi deletado',
                            'success'
                        ).then((result) =>{
                            window.location.reload(false);
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
          })
         
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
            </Box>
            )
        } 
        //return events
        return (
            this.state.feed.map(post => (
                <article key={post._id}>
                    <header>
                    <Box key={post._id} className="displaytabs" style={{fontSize:'36px', marginBottom:'10px'}}>
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
                            {(this.state.role === 'Admin' || this.state.role === 'CA') 
                            ? <>
                                <IsolatedMenu  id={post._id} handleEdit={this.handleEdit} handleDelete = {this.handleDelete}/>
                            </>
                            : '' }
                                
                        </Box>
                        <div className="user-info" style={{textAlign: 'justify'}}>
                            <Typography  gutterBottom>
                                <span>{post.descricao}</span>
                            </Typography>
                            
                        
                            {/* <span className="place">{post.place}</span>                                                  */}
                        </div>
                        
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
        const adminFab =  (this.state.role === 'Admin' || this.state.role === 'CA' ) ? 
            <Fab color='primary' className={classes.fab} onClick={this.handleCreate}> <AddIcon /> </Fab> 
                : 
            null
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
                {adminFab}
            </Box>
            </div>
        );
    }
}

export default withStyles(styles) (Feed);

