import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
// import CustomizedExpansionPanels from '../components/Accordion'
import CustomizedExpansionPanels from '../../components/AccordionFAQ'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../services/api';;


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
    const [state, setState] = React.useState({});
    const [role, setRole] = React.useState({});
    const [expanded, setExpanded] = useState('panel');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    React.useEffect( () => {
        onLoad();
   }, []);

    async function onLoad(){
        const cookie = JSON.parse( await localStorage.getItem('jtwToken'))
        
        setRole({role: cookie?.user?.role})

		const response = await api.get('/ajuda');
        setState({ ...state, data: response.data });    
        
	}
     
    const handleCreate = () =>{
        window.location.href=`/ajuda/criar/`
    }

     const perguntas = state.data
     const adminFab =  (role.role=== 'Admin') ? 
     <Fab color='primary' className={classes.fab} onClick={handleCreate}
        style={{ position: 'fixed', bottom: '25px', right: '25px',}}> <AddIcon /> </Fab> 
            : 
        null

    return  perguntas ? (<div>
        <Box className={classes.container} >
        <Typography variant={'h4'} color={'secondary'} weight={300} bottomspace={'small'}>
    		Ajuda
  		</Typography>

		<Typography color={'textSecondary'} style={{ marginLeft: '20px' }} bottomspace={'small'}>
			Perguntas Frequentes
		</Typography >
            <Box style={{ marginTop: '20px' }}>
                      <CustomizedExpansionPanels perguntas={perguntas} id={perguntas._id} expanded={expanded}
                     setExpanded={setExpanded} role={role.role} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            </Box>
            
        </Box>
        {adminFab}
            </div>
            ) : (
                <Box className={classes.container} ><CircularProgress /></Box>)

}
export default withStyles(styles, { withTheme: true })(Example)