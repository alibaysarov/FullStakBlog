import styled from '@emotion/styled';
import { Avatar, Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import NavMenu from '../components/NavMenu';
import { useTheme } from '@emotion/react';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedPage from './../components/AnimatedPage/index';
import { Navigate, useLocation } from 'react-router';
import { getUser } from '../redux/slices/user';
import { getMe } from '../redux/slices/authSlice';

const UserPage = () => {
    const [isSubsriped,setIsSubscribe]=React.useState(false);
   
    const theme=useTheme()
    const location=useLocation()
    const id=location.pathname.replace('/user/','')
    const {user}=useSelector(state=>state.auth)
    
    const dispatch=useDispatch()
    
    const subscribeHandler=()=>setIsSubscribe(prev=>!prev);
    const UserBackGround=styled(Box)(({theme})=>({
        width:'100%',
        height:'400px',
        overflow:'hidden',
        background:'radial-gradient(71.18% 579.63% at -7.12% 153.24%, #007DFF 0%, rgba(0, 125, 255, 0.5) 100%)',
    }))
    const mySubs=user.subsribtions?.length;
    
    const UserAvatar=styled(Avatar)(({theme})=>({
        width:'200px',
        height:'200px',
        position:'relative',
        transform:'translateY(-45%)',
        marginRight:"20px",
        maxWidth:'100%',
        border:'3px solid #fff',
        
    }))
    React.useEffect(()=>{
      dispatch(getMe())
    },[])
    return (
      <AnimatedPage>
        
        <Box marginY={10} paddingY={5}>
          {
          id!=user._id
          && <Navigate to={`/profile/${id}`}/>
          }
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
                      <NavMenu/>
                    </Box>
                    </Grid>
                    <Grid item xs={12} xl={7}>
                      <Box >
                        
                        <Paper elevation={3} sx={{borderRadius:4,overFlow:'hidden'}}>
                        <UserBackGround/>  
                        <Stack marginBottom={3} sx={{paddingX:2,paddingBottom:3,borderTop:'none'}} direction="horizontal"
                        justifyContent={'space-between'}>
                          <Stack direction="horizontal" spacing={7}>
                             <UserAvatar src={user.avatarUrl}/>
                            <Stack direction="vertical" sx={{flexDirection:'column'}}>
                              <Typography variant="h2" component={'h2'}>{user.fullname}</Typography>
                              <Stack direction="horizontal" sx={{gap:3}}>
                                <Typography variant="body1" component={'p'}>22.6K Подписчиков</Typography>
                                <Typography variant="body1" component={'p'}>{mySubs} Подписок</Typography>
                              </Stack>
                              <Typography component={'subtitle2'} >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sapiente sequi optio harum quod. Voluptates at quas sunt numquam sequi quisquam inventore placeat nemo.
                              </Typography>
                              <Box mt={1}>
                                {
                                  isSubsriped
                                  ?<Button onClick={subscribeHandler} variant="outlined">Вы подписаны</Button>
                                  :<Button onClick={subscribeHandler} variant='contained'>Подписаться</Button>
                                }
                                
                                
                              </Box>
                            </Stack>
                          </Stack>
                        </Stack>
                        </Paper>
                        <Paper elevation={3}  sx={{padding:2,borderRadius:2,marginY:5}}>
                          <Stack direction="row" spacing={2} >
                              <Chip size={'large'} variant='contained' color="primary" label="Все публикации"/>
                              <Chip size={'large'} variant='outlined' color="primary" label="Публикации автора"/>
                          </Stack>
                        </Paper>
                        <Stack direction={'column'} spacing={3}>
                          
                          <Post
                            title={'MyPost 1'}
                            content={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vel. Voluptates, exercitationem tenetur corrupti nam sapiente sequi non deleniti temporibus quo veniam laborum iusto, laudantium quisquam, tempora vel fuga obcaecati.'}views={23}tags={['tag1',"tag2",'tag3']}postImg={'123'}
                            _id={'123'}
                            likes={76}
                            time={new Date().toISOString()}
                          />
                          <Post
                            title={'MyPost 1'}
                            content={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vel. Voluptates, exercitationem tenetur corrupti nam sapiente sequi non deleniti temporibus quo veniam laborum iusto, laudantium quisquam, tempora vel fuga obcaecati.'}views={23}tags={['tag1',"tag2",'tag3']}postImg={'123'}
                            _id={'123'}
                            likes={76}
                            time={new Date().toISOString()}
                          />
                          <Post
                            title={'MyPost 1'}
                            content={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, vel. Voluptates, exercitationem tenetur corrupti nam sapiente sequi non deleniti temporibus quo veniam laborum iusto, laudantium quisquam, tempora vel fuga obcaecati.'}views={23}tags={['tag1',"tag2",'tag3']}postImg={'123'}
                            _id={'123'}
                            likes={76}
                            time={new Date().toISOString()}
                          />
                        </Stack>
                      </Box>
                    </Grid>    
                </Grid>
            </Container>
        </Box>
      </AnimatedPage>
        
        
    );
};

export default UserPage;