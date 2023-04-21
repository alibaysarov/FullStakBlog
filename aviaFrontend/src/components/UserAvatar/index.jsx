import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { logout } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
const UserAvatar = () => {
    const theme=useTheme()
    const dispatch=useDispatch();
    const{user:{avatarUrl,fullname}} =useSelector(state=>state.auth);
    const shortName=fullname?fullname.split(' ').map(el=>el[0]).join(''):'';
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandlder=()=>{
      dispatch(logout());
    }
    return (
        <>
        <Tooltip title="Профиль">
        <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            {
                avatarUrl
                ?<Avatar src={avatarUrl}/>
                :<Avatar>{shortName}</Avatar>
            }
        </IconButton>
        </Tooltip>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            
        >
            <Link to={'/admin'} style={{textDecoration:'none',color:theme.palette.text.primary}}>
                <MenuItem onClick={handleClose} sx={{padding:2}} ><AddIcon sx={{mr:3}}/> Добавить пост</MenuItem>
            </Link> 
            <MenuItem sx={{padding:2}} onClick={logoutHandlder} > <LogoutIcon sx={{mr:3}}/>Выйти</MenuItem>
        </Menu> 
        </>
    );
};

export default UserAvatar;