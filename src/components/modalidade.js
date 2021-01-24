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
import Typography from "@material-ui/core/Typography";

import api from '../services/api';
import { Fab } from '@material-ui/core';
import Swal from 'sweetalert2';


const tableIcons = {
	Add: forwardRef((props, ref) => <Fab  color='primary'><AddIcon  {...props} ref={ref} /></Fab>),
	New:  forwardRef((props, ref) => <AddIcon  color="primary"{...props} ref={ref} />),
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
const MaterialTableDemo = (props ) => {
	
  	const [state, setState] = React.useState({		
		titulo: <div>
		<Typography  style={{display: 'inline-block'}} variant='h6' color={'secondary'}  bottomspace={'small'}> 
			Módulos
		  </Typography>
		  <Typography color={'textSecondary'} style={{display: 'inline-block', marginLeft:'10px'}} >
			 Atividades e Cargas Horarias
		</Typography>
		 </div>,
		subtitulo: <div>
		 	<Typography  style={{display: 'inline-block'}} variant='h6' color={'secondary'}  bottomspace={'small'}> 
			 	Atividades de refêrencia
		   	</Typography>
		  	</div>,

		columns: [
			{ title: 'Nome', field: 'nome' },

			{ title: 'Carga Horaria Máxima', field: 'cargaHorariaMax' },
			
			{ title: 'Carga Horaria Mínima', field: 'cargaHorariaMin' },
			{ title: 'Id', field: '_id', hidden:true,
				cellStyle: {
					display: 'none',
				},
				headerStyle: {
						display: 'none',
						
				},
			}
		
  ],
    data: [],
  });

	async function onLoad(){
		const response = await api.get('/modulo');	

		setState({ ...state, modulos: response.data, titulo: <div>
			<Typography  style={{display: 'inline-block'}} variant='h6' color={'secondary'}  bottomspace={'small'}> 
				Módulos
			  </Typography>
			  <Typography color={'textSecondary'} style={{display: 'inline-block', marginLeft:'10px'}} >
				 Atividades e Carga Horária
			</Typography>
			 </div>});
		
	}
	
	React.useEffect(() => {
		onLoad();
	}, []);

	const [referencia, setReferencia] = React.useState(null);

  	const handleEditar = (rowId) => {

		window.location.href=`/modalidade/editar/${rowId}`
	};

	const handleAddRef = async (rowId, data) => {

		const newPost = new FormData();
		newPost.append('nome', data.nome);

		const result = await api.post('/modulos/addref/'+rowId, newPost)
		// console.log('result.data :>> ', result.data);
		return result.data


	};

	const localization={
		  
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

    };

	const handleUpdateRef = async (rowId, data, old) =>{

		const newPost = new FormData();
		newPost.append('nome', data.nome);
		newPost.append('oldNome', old.nome);
		const result = await api.post('/modulos/editref/'+rowId, newPost)
		return result.data
	}
	const handleDeleteRef  = async (rowId, old) =>{

		const newPost = new FormData();
		newPost.append('nome', old.nome);
		const result = await api.post('/modulos/removeref/'+rowId, newPost)
		return result.data
	}

	 const change = event => {
		event.preventDefault();
		setReferencia({[referencia]: event.target.value});

	};
	

  return (
	<>
	<MaterialTable
		icons={tableIcons}
		title={state.titulo}
		columns={state.columns}
		data={state.modulos}
		options={{
			actionsColumnIndex: -1,
		}}
		actions={[
			{
			  icon: tableIcons.Edit,
			  tooltip: 'Editar',
			  onClick: (event, rowData) => handleEditar(rowData._id)
			}
		  ]}
		  detailPanel={[{
			render: props => {

				var modulos = []
				for (var i = 0; i < props.atividades.length; i++) {
					var nome = props.atividades[i];
					modulos.push({'nome':nome})
				}
			
			  return (
				  <>
				  <MaterialTable
					icons={tableIcons}
					title={state.subtitulo}
					localization={localization}
					columns={ [
						{ title: 'Nome', field: 'nome'}]}

					data={modulos}
					options={{
						actionsColumnIndex: -1,
					}}
					editable={{
						onRowAdd: newData =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const data = modulos;

								handleAddRef(props._id, newData).then(function(result) {
									// console.log('aaaa', newData)
									data.push(newData);
									Swal.fire({
										icon: 'success',
										title: 'Atividade de referência cadastrada',
									}).then((result) => {
										window.location.reload(false); 
									})
								});
								
			
								resolve();
							}, 1000);
							
						}),
						onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								handleUpdateRef(props._id, newData, oldData).then(function(result) {

									Swal.fire({
										icon: 'success',
										title: 'Atividade de referência alterada',
									}).then((result) => {
										window.location.reload(false); 
									})
								})
			
								resolve();
							}, 1000);
						}),
						onRowDelete: oldData =>
							new Promise(resolve => {
								setTimeout(async () => {
								resolve();
								const data = [modulos];
									handleDeleteRef(props._id,oldData).then(function(result) {
									
										data.splice(data.indexOf(oldData), 1);
										setState({ ...state, data });
										Swal.fire({
											icon: 'success',
											title: 'Atividade de referência removida',
										}).then((result) => {
											window.location.reload(false); 
										})
								});
								}, 600);
							}),
					}}
					
				  />
				</>
			  )
			},
		  },
	  
	  ]}  

	  localization={localization}
    />
    </>
  );
}
export default MaterialTableDemo