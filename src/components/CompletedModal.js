import React, { Component } from 'react';
import {Button} from '@material-ui/core/';

import Swal from 'sweetalert2';

// import './test.css'

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
      }
      sweetalertfunction(){
        const teste = Swal.mixin({
          customClass: {
            confirmButton: 'MuiButton-root MuiButton-contained MuiButton-containedPrimary test',
            cancelButton: 'MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary',
            actions: 'actions',
          },
          buttonsStyling: false
        })
        teste.fire({
            title: 'Parabéns, você completou suas atividades!',
            icon: 'success',
            html:
                '<p align=justify> O próximo passo é enviar os certificados dessas atividades. Deseja continar agora?</p>',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Vamos continar!',
            confirmButtonAriaLabel: 'Vamos continuar',
            cancelButtonText: 'Agora não',
            cancelButtonAriaLabel: 'Agora não',
            footer: '<a class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorTextSecondary" href='+window.location.origin + '/ajuda> Ajuda </a>',
          })
	}
    
  render() {
    return 	(<div>
                <Button variant="outlined" color='secondary' onClick={this.sweetalertfunction}> teste</Button>	
                
                
            </div>)
  }
}

export default (Modal);
