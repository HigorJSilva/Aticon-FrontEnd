import React  from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
// import CustomizedExpansionPanels from '../components/Accordion'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'

import api from '../../services/api';import { Button, CircularProgress, TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
;


const styles = (theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(12),
    },
})

const useStyles = makeStyles((theme) => ({
	container: {
		// display: 'flex',
		width: '80%',
		margin: '0 auto',
		marginTop:'20px',
		backgroundColor: '#FAFAFA',
		position: 'relative',
	},
  }));


function Example(props) {
    const [inputErro, setInputErro] = React.useState(null);
    const [Matricula, setMatricula] = React.useState(null);
    const [auth, setAuth] = React.useState(null);

    const classes = useStyles();

    React.useEffect( () => {
        onLoad();
   }, []);

    async function onLoad(){ 
        const response = await api.get('/getCompleteStatus');
        setAuth(response.data.isCompleto);
        console.log('response :>> ', response.data.isCompleto);
	}
     

    const change = event => {
		event.preventDefault();
		setMatricula(event.target.value);

    };
    
    const handleSend = async () => {
        if(validate()){
            console.log('object :>> ', Matricula);
            const formdata = new FormData();
            
            formdata.append('matricula', Matricula)
            	let fileLocation = [];
                fileLocation = await api.post('/gerarPlanilha', formdata);

                setTimeout(() => {
                	Swal.fire({
                		icon: 'success',
                		title: 'Planilha gerada',
                		html: "<a href="+api.defaults.baseURL+ '/files/planilhas/'+fileLocation.data+"> Baixar planilha </a>",
                		showConfirmButton: false,
                		// confirmButtonText:'Retornar'
                	  }).then((result) => {
                			api.get('/deletarPlanilha');
                	  })    
                    
                  }, 100);
        }else{
            console.log('erro :>> ', inputErro);
        }
        
       
    };

    function validate(){

        if( Matricula === "" || Matricula === undefined || Matricula === null){
            setInputErro('Número de matrícula é obrigatório');
            return false;
        }
        return true;
    };

    function renderForm(){

        return (
            <Box>
            <form className={classes.form} style={{ marginLeft: '20px'}}  noValidate>

                <TextField style={{display: 'flex', width: '50%' }}
                    autoFocus
                    required
                    // fullWidth
                    autoComplete="off"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    
                    id="matricula"
                    label="Número de matrícula"
                    name="matricula"
                    
                    onChange={event => change(event)}
                    
                    error={inputErro}
                    helperText={inputErro}

                            
                />

               <Button variant="contained" onClick={() => handleSend()} color="primary"> Gerar Planilha</Button>
               </form>
        </Box>
        );
    }


    return (
        <Box className={classes.container} >
            <Typography variant={'h4'} color={'secondary'} weight={300} bottomspace={'small'}>
                Gerar planilha
            </Typography>

            <Typography color={'textSecondary'} style={{ marginLeft: '20px' }} bottomspace={'small'}>
                Informe seu número de matricula e gere a planilha de atividades
            </Typography >
            {(auth === null) ? <CircularProgress/> : (!auth) ? window.location.href='/login' : renderForm()}
           
            
        </Box>
    )

}
export default withStyles(styles, { withTheme: true })(Example)