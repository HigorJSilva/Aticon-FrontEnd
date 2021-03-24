import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { forwardRef } from 'react';

import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DescriptionIcon from '@material-ui/icons/Description';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import api from '../services/api';
import { Fab } from '@material-ui/core';
import Swal from 'sweetalert2';

const tableIcons = {
	Add: forwardRef((props, ref) => <Fab  color='primary'>
	
   <AddIcon  {...props} ref={ref} /></Fab>),
	Check: forwardRef((props, ref) => <Check  color="primary"{...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear color="secondary"{...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline  color="secondary"{...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit color="primary" {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove color="primary" {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
	ViewCertificado: forwardRef((props, ref) => <VisibilityIcon color='primary' {...props} ref={ref} />)
};
const MaterialTableDemo = (props ) => {
	
  	const [state, setState] = React.useState({		
		titulo:'',

		columns: [
			{ title: 'Descrição', field: 'descricao',
			cellStyle: {
				minWidth: 200,
				maxWidth: 300,
				paddingRight:'0px'
			},	
		
		},

		{ title: 'Referência', field: 'referencia',
			headerStyle:{
				textAlign: "center",
			},
			cellStyle: {
				minWidth: 250,
				maxWidth: 300
			},
		},

		{
			title: 'Modalidade',
			field: 'modalidade',
			headerStyle:{
				textAlign: "center",
			},
			cellStyle: {
				textAlign: "center"
			}
		},
		{ title: 'Id', field: 'feedback', hidden:true,
			cellStyle: {
				display: 'none',
		  },
		  headerStyle: {
				display: 'none',
				
		  },
		},
		{
			title: 'Regime',
			field: 'presencial',
			lookup: { 'false': 'Distância', 'true': 'Presencial' },
			cellStyle: {
				textAlign: "center"
			}
		},
		{ title: 'Id', field: '_id', hidden:true,
			cellStyle: {
				display: 'none',
		  },
		  headerStyle: {
				display: 'none',
				
		  },
		},
		
		{ title: 'Hrs. Certificado', field: 'horasCertificado', type: 'numeric',
		headerStyle:{
			textAlign: "center",
		},
		cellStyle: {
			textAlign: "center"
		}},

		{ title: 'Hrs. Consideradas', field: 'horasConsideradas', type: 'numeric',
		headerStyle:{
			textAlign: "center",
		},
		cellStyle: {
			textAlign: "center"
		} }
  ],
    data: [],
  });

	async function onLoad(){
		const response = await api.get(`/atividades/${props.userId}`);
		const user = await api.get(`/getUser/${props.userId}`)

		setState({ ...state, data: response.data, titulo: <div>
			<Typography  style={{display: 'inline-block'}} variant='h6' color={'secondary'}  bottomspace={'small'}> 
				Atividades de {user.data.nome}
			  </Typography>
			  <Typography color={'textSecondary'} style={{display: 'inline-block', marginLeft:'10px'}} >
				 Matriz {user.data.matriz}
			</Typography>
			 </div>});

			//  console.log('object :>> ', response.data);
		
	}
	
	React.useEffect(() => {
		onLoad();
	},[]);

	const [open, setOpen] = React.useState(false);

	const [ajuda, setAjuda] = React.useState(null);

	const [feedback, setFeedback] = React.useState({
		activeAtiv: null,
	});

  	const handleClickOpen = (rowId) => {
		setOpen(true);
		setAjuda(rowId)
		setFeedback({...feedback, activeAtiv: rowId});
	};

  	const handleClose = () => {
    	setOpen(false);
	  };
	  
	const handleConfirm = () => {
		setOpen(false);
	};

	const sendFeedback = () => {

		let {activeAtiv, ...feedbackPure } = feedback
		// console.log('feedbackPure :>> ', Object.entries(feedbackPure).length === 0);

		if(Object.entries(feedbackPure).length === 0){
			
			api.get('/avaliacao/concluir/'+props.userId);
			
			Swal.fire(
				'Atividades confirmadas!',
				'O aluno completou as atividades e poderá gerar a planilha',
				'success'
			).then((result) => {
				if (result.dismiss === Swal.DismissReason.backdrop || result.isConfirmed) {
					return window.location.href='/dashboard';
				}
			});
			
		}else{
			const avaliacao = new FormData();
			avaliacao.append('feedback',JSON.stringify(feedback));

			api.post('/avaliacao/'+props.userId,avaliacao);

			Swal.fire( 'Feedback cadastrado', 'O aluno será notificado', 'success').then((result) => {
				if (result.dismiss === Swal.DismissReason.backdrop || result.isConfirmed) {
					return window.location.href='/dashboard';
				}
			});
			
		}
		
	};

	
	const change = event => {
		event.preventDefault();
		// console.log('ajuda :>> ', ajuda);
		setFeedback({...feedback,
			[ajuda]: event.target.value
		 });
		

	}

	//TODO: mostrar certificado
	const handleVerCertificado = async (rowId) => {
		for (var i = 0, len = state.data.length; i < len; i++) {
			if (state.data[i]._id === rowId) {
			  break;
			}
		  }

		// window.open(api.defaults.baseURL+ '/files/certificados/'+state.data[i].certificado)
		// var result = await api.get(`exibirCertificado/${state.data[i].certificado}`)

		// var file = new Blob([result.data], {type: 'application/pdf'});
		// var fileURL = URL.createObjectURL(file);
		// window.open(fileURL);

		// URL.createObjectURL(result.data)

		api.get(`exibirCertificado/${state.data[i].certificado}`, {
			method: "GET",
			responseType: "blob"
			//Force to receive data in a Blob Format
		})
		.then(response => {
			//Create a Blob from the PDF Stream
			const file = new Blob([response.data], {
				type: "application/pdf"
			});
			console.log('fileUELD :>> ', file);
			//Build a URL from the file
			const fileURL = URL.createObjectURL(file);
			console.log('fileUELD :>> ', file);
			//Open the URL on new Window
			window.open(fileURL);
		})
		.catch(error => {
			console.log(error);
		});


	}

	

  return (

	<>
	<MaterialTable
		icons={tableIcons}
		title={state.titulo}
		columns={state.columns}
		data={state.data}
		options={{
			actionsColumnIndex: -1,
		}}
		actions={[
			{
			  icon: tableIcons.Edit,
			  tooltip: 'Corrigir',
			  onClick: (event, rowData) => handleClickOpen(rowData._id)
			},
			{
				icon: tableIcons.ViewCertificado,
				tooltip: 'Ver certificado',
				onClick: (event, rowData) => handleVerCertificado(rowData._id)
			}
		  ]}
		  components={{
			Toolbar: props => (
			  <div>
				<MTableToolbar {...props} />
					<div style={{padding: '0px 10px', }}>
						<Button style={{width:' 20%'}} onClick={sendFeedback}
						variant="contained" color="primary"> Finalizar </Button>
					</div>
			  </div>
			),
		  }}
	  

	  localization={{
        pagination: {
			labelDisplayedRows: 'Mostrando {from}-{to} de {count}',
			labelRowsSelect: 'linhas'
        },
        toolbar: {
			nRowsSelected: '{0} linha(s) selecionada(s)',
			searchPlaceholder:'Procurar...'
        },
        header: {
            actions: 'Ações'
        },
        body: {
            emptyDataSourceMessage: 'Sem registros',
            filterRow: {
                filterTooltip: 'Filter'
			},
			editRow:{
				deleteText: 'Deseja deletar essa atividade',
				cancelTooltip:'Cancelar',
				saveTooltip: 'Salvar'
			}
			
		},

    }}
    />

<Dialog open={open} onClose={handleClose} disableBackdropClick={true}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Correção</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Descreva aqui quais elementos devem ser corrigidos para estar em conformidade.
          </DialogContentText>
          <TextField
		  	name={feedback.activeAtiv}
			autoFocus
			// id="outlined-multiline-static"
			label="Correção"
			multiline
			rows={4}
			id={feedback.activeAtiv} 
			variant="outlined"
			placeholder='Quais as alterações devem ser feitas?'
			fullWidth
			onChange={event => change(event)}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

	</>
  );
}
export default MaterialTableDemo