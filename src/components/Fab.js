import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import MenuIcon from '@material-ui/icons/Menu';
import AtividadesIcon from '@material-ui/icons/Assessment';
import EventosIcon from '@material-ui/icons/CalendarToday';
import PerfilIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    height: 380,
    backgroundAttachment: 'fixed',
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const actions = [
  { icon: <AtividadesIcon />, name: 'Atividades' },
  { icon: <EventosIcon />, name: 'Eventos' },
  { icon: <PerfilIcon />, name: 'Perfil' },
];

export default function SpeedDialTooltipOpen() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);

  

  const handleClick = (teste) => {
    setOpen(prevOpen => !prevOpen);
    console.log(teste);
  };

  const handleOpen = () => {
    if (!hidden) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<MenuIcon />}
        onBlur={handleClose}
        onClick={handleClick}
        onClose={handleClose}
        onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction 
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() =>  handleClick(action.name)}
          />
        ))}
      </SpeedDial>
  );
}