import React from 'react';
import { Stack, Button, Avatar, IconButton, Menu, MenuItem, Popover } from '@mui/material';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import UserAvatar from '../UserAvatar';
const UserBar = () => {
  const {isAuth}=useSelector(state=>state.auth);
  
  
  return (
    
    
        <Stack spacing={3} direction="row" alignItems={'center'}>
          {
            isAuth
            ?
            <>
              <UserAvatar/>
            </>
            :
            <>
            <Link to={'/register'} style={{textDecoration:'none'}}>
              <Button variant="contained">Регистрация</Button>
            </Link>
            <Link to={'/login'} style={{textDecoration:'none'}}>
              <Button variant="contained">Войти</Button>
            </Link>
            </>
              
          }
          
       </Stack>
      
    
    
    
  );
};

export default UserBar;