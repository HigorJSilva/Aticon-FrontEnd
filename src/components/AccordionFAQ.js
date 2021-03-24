import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box} from '@material-ui/core';
import IsolatedMenu from './IsolatedMenu';

import api from '../services/api'
import Swal from 'sweetalert2';

const ExpansionPanel = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel)

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        border: '1px solid #B2B2B2',
        color:'#000000'
    },
}))(MuiExpansionPanelDetails)

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: '#fafafa',
        color:'#3F51B5',
        marginBottom: 5,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary)

export default class CustomizedExpansionPanels extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            perguntas: this.props.perguntas
        };
    }

    handleChange = (panel) => (event, newExpanded) => {
        this.props.setExpanded(newExpanded ? panel : false)
    }


    handleEdit(perguntaId){
            window.location.href=`/ajuda/editar/${perguntaId}`
    }

     handleDelete(perguntaId){
        Swal.fire({
            title: 'Deseja deletar a pergunta?',
            text: "Essa alteração não é reversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim'
          }).then( async (result) => {
            if (result.value) {
                await api.get(`/ajuda/remove/${perguntaId}`).then(function(result) {
                    if(result.data.success){
                        Swal.fire(
                            'Pergunta Deletada',
                            'A pergunta foi deletada',
                            'success'
                        ).then((result) =>{
                            window.location.reload(false);
                        })
                       
                    }
                    else{
                        Swal.fire(
                            'Houve algo de errado!',
                            'Tente novamente',
                            'error'
                        )
                    }
                });
            }
          })
    }
    render() {

    return (
            
            this.state.perguntas.map((pergunta, i) => (
                <div key={i}>
            <ExpansionPanel square expanded={this.props.expanded === `panel_${pergunta._id}`} onChange={this.handleChange(`panel_${pergunta._id}`)}>
                
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color='primary' />} aria-controls={`panel_${pergunta._id}d-content`} id={`panel_${pergunta._id}d-header`}>
                    <Typography >{`${pergunta.titulo}`}</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails style={{justifyContent: 'space-between',
                 alignItems: 'center', flexWrap: 'row wrap'}}>
                    <Typography style={{marginTop:'0 auto',width:'90%'}}>
                        {`${pergunta.resposta}`} 
                    </Typography>
                    {(this.props.role === 'Admin' ) 
                            ? 
                            <><Box style={{flexDirection:'row', flexWrap: 'wrap', width:'auto'}}>

                             <IsolatedMenu  id = {pergunta._id} handleEdit = {this.handleEdit} handleDelete = {this.handleDelete}/>

                        </Box></>
                            : '' }

                </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>))
        )
    }
}