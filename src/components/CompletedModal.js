import React, { Component } from 'react';
import {Button} from '@material-ui/core/';

import swal from '@sweetalert/with-react'
import Swal from 'sweetalert2'
import Upload from '../pages/upload';

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
    }

    renderUploadfunction(){
      return <Upload/>
    }

      sweetalertfunction(){
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
                  content: (<Upload/>),
                }
                )
              }
            })
	}
    
  render() {
    return 	(
      <div>
        <Button variant="outlined" color='secondary' 
        onClick={this.sweetalertfunction}> Enviar</Button>	
      </div>)
  }
}

export default (Modal);
