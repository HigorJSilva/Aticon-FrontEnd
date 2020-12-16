import React, { Component } from "react";
import Dropzone from "../../components/Dropzone";
import Progress from "../../components/Progress";
import Button from '@material-ui/core/Button';

import "../../styles/upload.css";
import '../../styles/modal.css'
import api from '../../services/api';
import Swal from 'sweetalert2'

class Upload extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = this.sendRequest(this.state.files);
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(certificados) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[certificados.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[certificados.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[certificados.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();

      for (let index = 0; index < certificados.length; index++) {
        formData.append("certificado[]", certificados[index],certificados[index].name);
       
	  }
	  
		var self = this

      api.post('/certificados/send', formData).then(function(result) {
        // console.log( result)
        if(result.data.success){
          Swal.fire({
            customClass: {
              container: 'my-swal'
            },
            icon: 'success',
            title: 'Certificados enviados',
            text: 'Agora é só aguardar a correção',
          }).then((result) => {
           
              self.props.fechar()
          })
        }
        else{
            Swal.fire({
              customClass: {
                container: 'my-swal'
              },
              icon: 'error',
              title: 'Houve um erro',
              text: result.data.message,
			})
			
			  self.setState({ uploading: false, files: [], successfullUploaded: false  });
      }

        self.props.onModalResponse(result.data.success)
        // self.props.fechar()
      });	

      // // req.open("POST",   'http://localhost:3333/certificados/send',true);
      // req.open("POST",   api.defaults.baseURL+'/certificados/send',true);

      // req.send(formData);

    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
      return (
        <div>
          <Button variant="outlined" style={{marginRight: '20px'}}
            onClick={() =>
              this.setState({ files: [], successfullUploaded: false })
            }
          >
            Limpar
          </Button>
          <Button variant="contained" color="primary"
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Enviar
        </Button>
      </div>
      );
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Envie todos os certificados</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;