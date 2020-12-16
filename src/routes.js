import React from 'react';
import { Route,  Switch } from 'react-router-dom';

import  {Role}  from './_helpers/Role';
import { PrivateRoute } from '../src/components/PrivateRoute'

import Index from './pages/Atividades/index';
import login from './pages/Auth/login';
import register from './pages/Auth/register';
import evento from './pages/Eventos/eventos';
import dash from './pages/Avaliacao/dashboard';
import avaliacao from './pages/Avaliacao/avaliacao'
import faq from './pages/FAQ/FAQIndex'
import faqCRUD from './pages/FAQ/FAQCRUD'
import eventosCriar from './pages/Eventos/ModalAddEvento'
import perfil from './pages/Perfil/Perfil'
import AlterarDados from './pages/Perfil/AlterarDados'
import recuperacaoSenha from './pages/Auth/recuperacaoSenha';
import modalidade from './pages/Modalidade/modulos';
import modaliadeCrud from './pages/Modalidade/modaliadeCrud';
import upload2 from './pages/Atividades/upload2';

function Routes(){
    return(
        <Switch>
                <Route path="/login" exact component = {login} />
                <Route path="/" exact component = {login} />
                <Route path="/register" exact component ={register} />
                <Route path="/ajuda" exact component ={faq} />
                <Route exact path="/esquecisenha" component={recuperacaoSenha} />

                <Route exact path="/upload2" component={upload2} />


                <PrivateRoute exact path="/atividades" roles={[Role.User, Role.CA]} component={Index} />
                <PrivateRoute exact path="/perfil" roles={[Role.User, Role.CA]}component={perfil} />
                <PrivateRoute exact path="/alterarDados" roles={[Role.User, Role.CA]} component={AlterarDados} />

                <PrivateRoute exact path="/dashboard" roles={[Role.Admin]} component={dash} />
                <PrivateRoute path="/correcao/:id" roles={[Role.Admin]} exact component ={avaliacao} />

                <PrivateRoute exact path="/eventos"  roles={[Role.User,Role.Admin, Role.CA]} component ={evento} />
                <PrivateRoute path="/eventos/criar" roles={[Role.Admin, Role.CA]} exact component ={eventosCriar} />
                <PrivateRoute path="/eventos/editar/:id" roles={[Role.Admin, Role.CA]} exact component ={eventosCriar} />
                
                <PrivateRoute path="/ajuda/criar/" roles={[Role.Admin]} exact component ={faqCRUD} />
                <PrivateRoute path="/ajuda/editar/:id" roles={[Role.Admin]} exact component ={faqCRUD} /> 

                <PrivateRoute path="/modalidade/" roles={[Role.Admin]} exact component ={modalidade} />
                <PrivateRoute path="/modalidade/editar/:id" roles={[Role.Admin]} exact component ={modaliadeCrud} /> 

        </Switch>
    )
}

export default Routes;
