import React, { Component } from 'react';
import {Button} from '@material-ui/core/';

import swal from '@sweetalert/with-react'
import Swal from 'sweetalert2'
import Upload from '../pages/Atividades/upload';

import '../styles/modal.css'

// const MySwal = withReactContent(Swal)

class Modal extends Component {
    constructor(props) {
		super(props);
        this.state = {
            titulo: "",
            corpo: "",
            footer: "",
		};
		this.sweetAlert = this.sweetalertfunction.bind(this);
		this.renderUpload = this.renderUploadfunction.bind(this);
		this.certiResponse = this.certiResponse.bind(this);
    }

    certiResponse(modalResponse){
      this.setState({status: modalResponse});
      console.log('Modadl response: >>',modalResponse)
      
      this.props.onModalResponse(modalResponse); 
		  return 1;
  	}

    renderUploadfunction(){
     	 return <Upload/>
    }

      sweetalertfunction(self){

	// console.log(self.certiResponse)
		const modal = Swal.mixin({
			customClass: {
				confirmButton: 'MuiButton-root MuiButton-contained MuiButton-containedPrimary test',
				cancelButton: 'MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary',
				actions: 'actions',
			},
			buttonsStyling: false
		})

        modal.fire({
            title: 'Você completou suas atividades!',
            icon: 'success',
            html:'Agora é só enviar os certificados dessas atividades.',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: ' Vamos continar!',
            confirmButtonAriaLabel: 'Vamos continuar',
            cancelButtonText: 'Agora não',
            cancelButtonAriaLabel: 'Agora não',
            footer: '<a class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorTextSecondary" href='+window.location.origin + '/ajuda> Ajuda </a>',
          	}).then((result) => {
            	if (result.value) { 
                swal({
                  className: "upload-modal",
                  content: (<Upload fechar={swal.close} onModalResponse={self.certiResponse} />),
                  footer: null
                })  
              }
            })
	}
    
  render() {
    let buttonText = (this.props.disabled)? 'Aguardando Correção' : 'Enviar Atividades' 
    return 	(
      <div>
        <Button variant="outlined" color='secondary' disabled={this.props.disabled} fullWidth
        onClick={() => this.sweetalertfunction(this)}> {buttonText} </Button>	
      </div>)
  }
}

export default (Modal);
