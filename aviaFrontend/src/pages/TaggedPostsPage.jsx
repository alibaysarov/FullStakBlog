import React from 'react';
import { useParams } from 'react-router';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

import { styled } from '@mui/material/styles';
import SideBar from './../components/SideBar/index';
import TaggedPosts from '../components/TaggedPosts';
import NavMenu from '../components/NavMenu';
import AnimatedPage from '../components/AnimatedPage';
const TaggedPostsPage = () => {
  const {tag}=useParams()
  return (
    <Box marginY={10} paddingY={5}>
      <Container mt={4} maxWidth="xxl">
        <Grid container={true} spacing={3} justifyContent="space-between" >
          <Grid item
          xs={2}
          sx={
            {
              display:{
                xs:'none',
                xl:'block'
              }
          }} >
            <Box sx={{position:'fixed'}}>
              
              <NavMenu/>
            </Box>
          </Grid>
          <Grid item xs={12} xl={7}>
          <Typography variant={'h4'} component={'h4'}>
                {`# ${tag}`}
              </Typography>
              <AnimatedPage>
                <TaggedPosts/>
              </AnimatedPage>
            
          </Grid>
          <Grid item
            xs={4}
            xl={3}
            sx={
              {
                display:{
                  xs:'none',
                  xl:'block'
                }
            }} 
            >
            <Stack direction={'column'} spacing={2} sx={{position:'fixed'}}>
              <SideBar>
                <Typography variant='h4' component={'h5'}>Рекомендации</Typography>
              </SideBar>
            </Stack>
          </Grid>
        </Grid>
        
      
    </Container>
    </Box>
    
  );
};

export default TaggedPostsPage;