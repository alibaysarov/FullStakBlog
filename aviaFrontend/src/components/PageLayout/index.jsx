import { Box, Container, Grid, Stack } from '@mui/material';
import React from 'react';
import NavMenu from '../NavMenu';
import Recomendations from '../Recomendations';
import MyAuthors from '../MyAuthors';
import { useSelector } from 'react-redux';

const PageLayout = ({children,}) => {
    const {isAuth}=useSelector(state=>state.auth)
    console.log('auth is',isAuth)
    return (
        <Box marginY={10} paddingY={5}>
        <Container mt={4} maxWidth="xxl">
            <Grid container spacing={3} justifyContent={'start'}>
            <Grid
                item
                xs={2}
                sx={
                    {
                    display:{
                        xs:'none',
                        xl:'block'
                    }
                }} 
            >
            <Box sx={{position:'fixed'}}>
              {
                isAuth&&(<NavMenu/>)
              }
            </Box>
            </Grid>
            <Grid item xs={12} xl={7}>
                {
                    children
                }
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
                <Stack direction={'column'} spacing={3}>
                
                <Stack direction={'column'} spacing={5} sx={{position:'fixed'}}>
                  {
                    isAuth
                    &&<>
                    <Recomendations/>
                  <MyAuthors/>
                    </>
                  }
                  
                </Stack>
              </Stack>

            </Grid>
            </Grid>
        </Container>
        </Box>
                
    );
};

export default PageLayout;