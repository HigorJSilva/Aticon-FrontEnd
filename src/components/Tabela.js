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
import Autocomplete from '@material-ui/lab/Autocomplete';

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
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function MaterialTableDemo(props) {

	var  titulos =[];

	const [opt, setOpt] = React.useState(props.options);
	const valueOption = props.titulos;
	
	const [tabeleOptions, setTabeleOptions] = React.useState({
		titulo: <div>
		<Typography  style={{display: 'inline-block'}} variant='h6' color={'secondary'}  bottomspace={'small'}> 
			Atividades Complementares 
		  </Typography>
		  <Typography color={'textSecondary'} style={{display: 'inline-block', marginLeft:'10px'}} >
			 Cadasatre aqui suas atividades
		</Typography>
		 </div>,

	columns: [
		{ title: 'Descrição', field: 'descricao',
		cellStyle: {
			minWidth: 150,
			maxWidth: 250,
			paddingRight:'0px'
		},
		
		editComponent: props => (
			<TextField
				required={true}
				value={props.value}
				placeholder='Descrição'
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
		cellStyle: {
			minWidth: 250,
			maxWidth: 300
		},
		editComponent: props => (
				<Autocomplete
					id="referencia"
					disableClearable
					size="small"
					value={opt[valueOption.indexOf(props.value)]}
					options={opt}
					// groupBy={(option) => option.modulo}
					getOptionLabel={(option) => option.titulo}
					renderInput={(params) => { 
						return(
							<TextField
								{...params}
								value={props.value}
								label=""
								placeholder='Referência'
								margin="normal"
								multiline={true} 
							/>
							);}}
					onChange={e => props.onChange(e.target.innerText)}
				/>
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
			lookup: { 'I': 'I', 'II': 'II', 'III': 'III' }, headerStyle:{
				textAlign: "center",
			}, cellStyle: {
				textAlign: "center"
			},
		},
		{
			title: 'Regime',
			field: 'presencial',
			lookup: { 'false': 'Distância', 'true': 'Presencial' },
		},
		{ title: 'Hrs. Certificado', field: 'horasCertificado', type: 'numeric', headerStyle:{
			textAlign: "center",
		}, cellStyle: {
			textAlign: "center"
		},
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
		{ title: 'Hrs. Consedeiradas', field: 'horasConsideradas', type: 'numeric', headerStyle:{
			textAlign: "center",
		}, cellStyle: {
			textAlign: "center"
		},
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
	})

  	const [state, setState] = React.useState({
    	data: [],
  	});


  // Inicialização dos dados
  	async function onLoad(){
		const response = await api.get('/');
		setState({ ...state, data: response.data });
	}
	
	React.useEffect(() => {
		onLoad();
	},[]);

	// salvar dados
  async function handleSend(e){
		const newPost = new FormData();
		// if(validate(e)){
			newPost.append('descricao', e.descricao);
			newPost.append('referencia', e.referencia);
			newPost.append('modalidade',e.modalidade);
			newPost.append('presencial',e.presencial);
			newPost.append('horasCertificado',e.horasCertificado);
			return await api.post('/new', newPost).then(function(result) {
				console.log(result.data)
				return result.data
			});	
		// }
		// else{
		// 	var result = {success: false, };
		// 	return result;
		// }
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
		return result.data.success
	});	
}

  return (

	<>
	<MaterialTable
		icons={tableIcons}
		title={tabeleOptions.titulo}
		columns={tabeleOptions.columns}
		data={state.data}
		options={{
			actionsColumnIndex: -1,
		}}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(  () => {
				
				const data = [...state.data];
				handleSend(newData).then(function(result) {
					if(result.success){
						console.log('result.success :>> ', 'result.success');
						newData.horasCertificado > 40 ? newData.horasConsideradas = 40 : newData.horasConsideradas = newData.horasCertificado
						newData._id =  result.message;
						data.push(newData);
						console.log('pre SetState :>> ', 'pre SetState');
						setState({ ...state, data: data });
						console.log('pos SetState :>> ', 'pos SetState');
						Swal.fire({
							icon: 'success',
							title: 'Atividade cadastrada',
						})
					}
					else{
						Swal.fire({
							icon: 'error',
							title: 'Atividade inválida',
							text: result.message,
						})
					}
					
				});
				resolve();
				}, 600);
          }),
		  onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(async () => {
			  
			   handleUpdate(newData).then(function(result) {
				//   console.log(result.success)
				if(result.success){
					

					const data = [...state.data];
					newData.horasCertificado>40 ? newData.horasConsideradas = 40 : newData.horasConsideradas = newData.horasCertificado
					data[data.indexOf(oldData)] = newData;
					  setState({ ...state, data:data });
					  Swal.fire({
						icon: 'success',
						title: 'Atividade alterada',
					})
				}
				else{
					
					Swal.fire({
						icon: 'error',
						title: 'Atividade inválida',
						text: result.message,
					})
				}
				
			});
			//   data[data.indexOf(oldData)] = newData;
			//   setState({ ...state, data });
			resolve();
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(async () => {
             
			  const data = [...state.data];
			   handleDelete(oldData).then(function(result) {
				if(result){
					data.splice(data.indexOf(oldData), 1);
					  setState({ ...state, data });
					  Swal.fire({
						icon: 'success',
						title: 'Atividade removida',
					})
				}
				else{
					Swal.fire({
						icon: 'error',
						title: 'Houve um erro',
						text: 'Tente novamente',
					})
				}
			  });
			  resolve();
            }, 600);
          }),
	  }}
	
	  

	  localization={{
		  
        pagination: {
			labelDisplayedRows: 'Mostrando {from}-{to} de {count}',
			labelRowsSelect: 'linhas',
			firstTooltip: 'Primeira página',
			previousTooltip: 'Página anterior',
			nextTooltip: 'Próxima página',
			lastTooltip: 'Última página'
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
			},
			addTooltip:'Adicionar',
			editTooltip:'Editar',
			deleteTooltip:'Deletar',
			
		},

    }}
    />
	</>
  );
}