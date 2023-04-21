import { AppBar, InputBase, Stack, Typography, IconButton, Toolbar, Button, Avatar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from '../Search';
import MenuIcon from '@mui/icons-material/Menu';

import MenuMobile from '../MobileMenu';
import { useDispatch } from 'react-redux';
import { openDrawerHandler } from '../../redux/slices/uiSlice';
import { Link } from 'react-router-dom';
import UserBar from '../UserBar';
const Header = () => {
  const dispatch=useDispatch()
  return (
    <Box sx={{flexGrow:1}} >
      <AppBar position='fixed' sx={{padding:2}}>
        <Toolbar>
        <Stack direction={'row'} sx={{flexGrow:1}} justifyContent='space-between'>
          <Stack spacing={5} direction="row">
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={()=>dispatch(openDrawerHandler())}
              aria-label="menu"
              sx={
                {
                  display:{
                  xs:'block',
                  xl:'none'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{textDecoration:'none'}}>
              <Typography
                variant="h2"
                sx={{display:{xs:'none',xl:'block'}}}
                component={'h2'}
                color={'#fff'}
              >Aviation Blog
              </Typography>
            </Link>
            <SearchInput/>
          </Stack>
          {/* <Link style={{textDecoration:'none',display:'flex'}} to="/user/:id"> */}
          <UserBar/>
          {/* </Link> */}
          
        </Stack>
        </Toolbar>
      </AppBar>
      <MenuMobile/>
    </Box>
  );
};

export default Header;