import { Button, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

import React from 'react';
import { styled } from '@mui/material/styles';
import SideBar from './../components/SideBar/index';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavMenu from '../components/NavMenu';
import MainPosts from '../components/MainPosts';
import MainPostsTitle from '../components/MainPostsTitle';
import Recomendations from '../components/Recomendations';
import MyAuthors from '../components/MyAuthors';
import PageLayout from '../components/PageLayout';
import { useSelector } from 'react-redux';
const Home = () => {
  const {isAuth}=useSelector(state=>state.auth)
  return (
    <PageLayout>
      <MainPostsTitle/>
      <MainPosts/>
    </PageLayout>
    
            
         
  );
};

export default Home;