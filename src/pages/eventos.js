import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';


import Titulo from '../components/titulo';


import './feed.css';


class Feed extends Component{
    state={
        feed:[],

    }
    
    async componentDidMount(){

        // const response = await api.get('posts');

        // this.setState({feed:response.data});
    }

   

    render(){
        var feed;
        if(this.state.feed.length === 0){
           feed =  <div style={{ position: 'absolute',
            left: '35%',
            top: '50%',}}>
                <Typography variant='h4'> Nenhum evento cadastrado</Typography>

           </div>
        }

        return(
            <div>
                {/* <Header/> */}
                <Titulo/>
                {feed}
            <section id="post-list">
                
                {this.state.feed.map(post => (
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
                                label="Módulo I"
                                color="primary"
                                

                            ></Chip>
                            <Chip
                             avatar={<Avatar><AccessTimeIcon /></Avatar>}
                                label="30 horas"
                                color="primary"
                            />
                            <Chip
                             avatar={<Avatar><PersonIcon /></Avatar>}
                                label="Presencial"
                                color="primary"

                            />
                        </Box>
                        {/* <img src={more} alt="Mais"/>                         */}
                    </header>
                    <img src='https://i0.wp.com/www.deviante.com.br/wp-content/uploads/2018/11/Campus.jpeg' alt="" />
                    

                </article>

                ) )}
                
               
            </section>
            </div>
        );
    }
}

export default Feed;

