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
	
  	const [state, setState] = React.useState({
		
	titulo: <div>
	<Typography  style={{display: 'inline-block'}} variant='h6' color={'secondary'}  bottomspace={'small'}> 
		Atividades Enviadas 
  	</Typography>
  	<Typography color={'textSecondary'} style={{display: 'inline-block', marginLeft:'10px'}} >
 		Não será possivel fazer alterações por enquanto
	</Typography>
 	</div>
 
  ,
  
  
	columns: [
		{ title: 'Descrição', field: 'descricao',
            cellStyle: {
                minWidth: 150,
                maxWidth: 250,
                paddingRight:'0px'
            },
	    },
		{ title: 'Referência', field: 'referencia',
            cellStyle: {
                minWidth: 250,
                maxWidth: 300
            },		
	    },
		{ title: 'Id', field: '_id', hidden:true,
			cellStyle: {
				display: 'none',
		  },
		  headerStyle: {
				display: 'none',
				
		  },

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
        },
		{ title: 'Hrs. Consedeiradas', field: 'horasConsideradas', type: 'numeric', headerStyle:{
			textAlign: "center",
            }, cellStyle: {
                textAlign: "center"
            },
		}
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
	},[]);

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