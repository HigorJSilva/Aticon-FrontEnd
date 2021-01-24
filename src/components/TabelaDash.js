import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';

import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from "@material-ui/core/Typography";
// import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../services/api';


const tableIcons = {

	Watch: forwardRef((props, ref) => <AssignmentIcon  color="primary"{...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove color="primary" {...props} ref={ref} />),
};

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
		
	titulo: <div>
	<Typography  style={{display: 'inline-block'}} variant='h6' color={'secondary'}  bottomspace={'small'}> 
		Atividades Enviadas
  	</Typography>
  	<Typography color={'textSecondary'} style={{display: 'inline-block', marginLeft:'10px'}} >
 		Valide as atividades
	</Typography>
 	</div>
 
  ,
  
	columns: [
		
		{ title: 'Aluno', field: 'nome', },
		{ title: 'Matriz', field: 'matriz', },
		{ title: 'Email', field: 'email', },
		
	],
		
    data: [],
  });


  // Inicialização dos dados
  	async function onLoad(){
		const response = await api.get('/userPendente');
		setState({ ...state, data: response.data })

	}
	
	React.useEffect(() => {
		onLoad();
	},[]);

	const handlePageChange = (props) => {
		window.location.href=`/correcao/${props}`
	}

  return (
	<>
	<MaterialTable
		
		icons={tableIcons}
		title={state.titulo}
		columns={state.columns}
		data={state.data}
		actions={[
			{
			  icon: tableIcons.Watch,
			  tooltip: 'Avaliar',
			  onClick: (event, rowData) => handlePageChange(rowData._id)
			}
		  ]}
		options={{
			actionsColumnIndex: -1,
			search: false,
			editable:false
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