import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

 const IsolatedMenu = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    return(
        <React.Fragment>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={event => setAnchorEl(event.currentTarget)}
                >
                    <MoreIcon/>
            </IconButton>
            <Menu
                elevation={0}
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => props.handleEdit(props.id)}>
                            Editar
                    </MenuItem>
                    <MenuItem onClick={() => { 
                            setAnchorEl(null);
                            props.handleDelete(props.id);
                        }}>
                            Excluir
                    </MenuItem>

            </Menu>
            
        </React.Fragment>
    )
}
export default IsolatedMenu;