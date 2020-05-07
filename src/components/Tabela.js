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
// import Autocomplete from '@material-ui/lab/Autocomplete';


import api from '../services/api';
import { Fab } from '@material-ui/core';
import Swal from 'sweetalert2';
import { config } from '../_helpers/config';

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
	const defaultProps = {
		options: config.referencia,
		getOptionLabel: config.referencia
	  };
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
			// <Autocomplete
			// 	id="select-on-focus"
			// 	{...defaultProps}
			// 	selectOnFocus
				// renderInput={
					<TextField
						value={props.value}
						fullWidth={true}
						multiline={true}
						InputLabelProps={{
							shrink: true
						}}
						onChange={e => props.onChange(e.target.value)}
					/>
				// }/>
				)
		
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
		{ title: 'Hrs. Certificado', field: 'horasCertificado', type: 'numeric', 
		ditComponent: props => (
			<TextField
				value={props.value}
				InputProps={{
					inputProps: { 
						min: 2
					}
				}}
				multiline={true}
				inputProps={{ min: 0}}
				InputLabelProps={{
					shrink: true
			  	}}
			onChange={e => props.onChange(e.target.value)}
		/> )},
		{ title: 'Hrs. Conseideradas', field: 'horasConsideradas', type: 'numeric', 
		editComponent: props => (
			<TextField
				disabled
				value={props.value}
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
		// const response = await api.get('/');
		// setState({ ...state, data: response.data });
		setState({ ...state, data: [{
        "_id": "5e9254bdf328930928a2a7d2",
        "aluno": "5e2320f393c7e30de8ff5def",
        "descricao": "1º Congresso de Python do Centro Oeste",
        "modalidade": "II",
        "referencia": "Instrutor em palestras técnicas, seminários, grupos de estudos, cursos da área específica de formação, não remunerados e de interesse da sociedade;",
        "presencial": false,
        "horasCertificado": 10,
        "horasConsideradas": 10,
        "__v": 0
    },
    {
        "_id": "5e9258cfc2087a2c082833f6",
        "aluno": "5e2320f393c7e30de8ff5def",
        "descricao": "3º Congresso de Python do Centro Oeste",
        "modalidade": "I",
        "referencia": "Palestrante",
        "presencial": true,
        "horasCertificado": 20,
        "horasConsideradas": 20,
        "__v": 0
    }] });

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
	return await api.post('/edit/'+ e._id, newPost).then(function(result) {
		// console.log( result.data)
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
			actionsColumnIndex: -1,
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
						Swal.fire({
							icon: 'error',
							title: 'Valor inválido',
							text: result.message,
						})
					}
					
				});
				}, 600);
          }),
		  onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(async () => {
              resolve();
			  
			  await handleUpdate(newData).then(function(result) {
				//   console.log(result.success)
				if(result.success){

					const data = [...state.data];
					newData.horasCertificado>40 ? newData.horasConsideradas = 40 : newData.horasConsideradas = newData.horasCertificado
					data[data.indexOf(oldData)] = newData;
              		setState({ ...state, data });
				}
				else{
					
					Swal.fire({
						icon: 'error',
						title: 'Valor inválido',
						text: result.message,
					})
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