import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DescriptionIcon from '@material-ui/icons/Description';
import { IconButton, Typography } from "@material-ui/core";


 const Fileinput= props=> {
    const hiddenFileInput = React.useRef(null);
    const [check, setCheck] = React.useState(false);
    const toggleChecked = () => setCheck(check => !check);

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    const handleChange = event => {

      if( hiddenFileInput.current.value !== null)
        toggleChecked();
      
      const fileUploaded = event.target.files[0];
      const atividadeId = event.target.id;
      const certificado = {fileUploaded, atividadeId };
      props.handleFile(certificado);
      // setCheck( prevCheck  => prevCheck + 1 )

    };

    const atividade = props.atividade
    const classes = props.classes

    return(
        <React.Fragment>
            <Grid  key={atividade._id} item xs={12}>
							<Paper style={{elevation:1}} className={classes.paper}>

								<Typography className={classes.typografy} color= {'textSecondary'} variant="subtitle1" component="h2"> 
									{atividade.descricao} 
								</Typography>

								<IconButton style={{justifySelf:'end'}} onClick={handleClick}> 
									<DescriptionIcon color={ check ? 'primary' : 'action'}/>
									
									<input type="file"
										id={atividade._id}
										accept=".pdf"
										ref={hiddenFileInput}
										onChange={handleChange}
										style={{display: 'none'}} />

								</IconButton> 
							  </Paper>
						</Grid>
            
        </React.Fragment>
    )
}
export default Fileinput;