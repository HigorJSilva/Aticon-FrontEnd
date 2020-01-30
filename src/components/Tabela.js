import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddIcon from '@material-ui/icons/Add';
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


import api from '../services/api';
import { Fab } from '@material-ui/core';

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
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
		
	titulo: <div>
	<Typography  style={{display: 'inline-block'}} variant='h6' color={'secondary'}  bottomspace={'small'}> 
		Atividades Complementares 
  	</Typography>
  	<Typography color={'textSecondary'} style={{display: 'inline-block', marginLeft:'10px'}} >
 		Cadasatre aqui suas atividades
	</Typography>
 	</div>
 
  ,
  
	columns: [
		{ title: 'Descrição', field: 'descricao',
		
		editComponent: props => (
			<TextField
				value={props.value}
				fullWidth={true}
				multiline={true}
				InputLabelProps={{
					shrink: true
				}}
			onChange={e => props.onChange(e.target.value)}
			/>
		)
	},
		{ title: 'Referência', field: 'referencia',
		editComponent: props => (
			<TextField
				value={props.value}
				fullWidth={true}
				multiline={true}
				InputLabelProps={{
					shrink: true
				}}
			onChange={e => props.onChange(e.target.value)}
			/>)
		
	},
		{ title: 'Id', field: '_id', hidden:true,
			cellStyle: {
				display: 'none',
		  },
		  headerStyle: {
				display: 'none',
				
		  },
		  editComponent: props => (
			<TextField
				value={props.value}
				fullWidth={true}
				multiline={true}
				InputLabelProps={{
				shrink: true
			  }}
			onChange={e => props.onChange(e.target.value)}
		/> )
		},
		{
			title: 'Modalidade',
			field: 'modalidade',
			lookup: { 'I': 'I', 'II': 'II', 'III': 'III' },
		},
		{
			title: 'Regime',
			field: 'presencial',
			lookup: { 'false': 'Distância', 'true': 'Presencial' },
		},
		{ title: 'Hrs. Certificado', field: 'horasCertificado', type: 'numeric',  },
		{ title: 'Hrs. Conseideradas', field: 'horasConsideradas', type: 'numeric', 
		editComponent: props => (
			<TextField
				disabled
				value={props.value}
				fullWidth={true}
				multiline={true}
				InputLabelProps={{
				shrink: true
			  }}
			onChange={e => props.onChange(e.target.value)}
		/> )}
  ],
    data: [],
  });


  // Inicialização dos dados
  	async function onLoad(){
		const response = await api.get('/');
		setState({ ...state, data: response.data });
	}
	
	React.useEffect(() => {
		onLoad();
	}, []);

	// salvar dados
  async function handleSend(e){
		const newPost = new FormData();
		newPost.append('descricao', e.descricao);
		newPost.append('referencia', e.referencia);
		newPost.append('modalidade',e.modalidade);
		newPost.append('presencial',e.presencial);
		newPost.append('horasCertificado',e.horasCertificado);
		return await api.post('/new', newPost).then(function(result) {
			console.log(result.data)
			return result.data
		});	
	}

	// alterar dados
async function handleUpdate(e){
	const newPost = new FormData();
	newPost.append('descricao', e.descricao);
	newPost.append('referencia', e.referencia);
	newPost.append('modalidade', e.modalidade);
	newPost.append('presencial', e.presencial);
	newPost.append('horasCertificado', e.horasCertificado);
	console.log(e);
	return await api.post('/edit/'+ e._id, newPost).then(function(result) {
		console.log( result.data)
		return result.data
	});	
}

async function handleDelete(e){

	return await api.get('/remove/'+ e._id).then(function(result) {
		console.log( result.data.success)
		return result.data.success
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
		actionsColumnIndex: -1
	}}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout( async () => {
				resolve();
				const data = [...state.data];
				await handleSend(newData).then(function(result) {
					if(result.success){
						newData.horasCertificado > 40 ? newData.horasConsideradas = 40 : newData.horasConsideradas = newData.horasCertificado
						newData._id =  result.message;
						data.push(newData);
						setState({ ...state, data });
					}
					else{
						console.log("eeeeeeeeeeerro");
					}
					
				});
				}, 600);
          }),
		  onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(async () => {
              resolve();
			  
			  await handleUpdate(newData).then(function(result) {
				if(result){
					const data = [...state.data];
					newData.horasCertificado>40 ? newData.horasConsideradas = 40 : newData.horasConsideradas = newData.horasCertificado

					
					data[data.indexOf(oldData)] = newData;
              		setState({ ...state, data });
				}
				else{
					//ESCREVER ERRO AQUI
				}
				
			});
			//   data[data.indexOf(oldData)] = newData;
            //   setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(async () => {
              resolve();
			  const data = [...state.data];
			  await handleDelete(oldData).then(function(result) {
				if(result){
					data.splice(data.indexOf(oldData), 1);
              		setState({ ...state, data });
				}
				else{
					//ESCREVER ERRO AQUI
				}
			  });
            //   data.splice(data.indexOf(oldData), 1);
            //   setState({ ...state, data });
            }, 600);
          }),
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
	</>
  );
}