import { Container, Grid, Stack, Typography, Chip, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { IconButton } from '@mui/material'
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePost } from './../redux/slices/postSlice';
import { styled } from '@mui/material/styles';
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTitle } from '../Hooks/useTitle.js';

const PostPage = () => {
  const {currentPost,status}=useSelector(state=>state.posts);
  const dispatch=useDispatch()
  const {id}=useParams();
  
  React.useEffect(()=>{
    const getMePost=async()=>{
      dispatch(getOnePost({id}))
      console.log(currentPost);
      useTitle(currentPost.title)
    }
    getMePost()
    document.title=currentPost?currentPost.title:'Загрузка...';
  },[])


  const PostImage=styled('img')(({theme})=>({
    width:'100%',
    maxWidth:'100%',
    objectFit:'cover',
    borderRadius:'10px'
  }))
  return (
    <Box marginY={17} position="relative">
      <Typography variant='h2' component={'h2'}>
      
        <Container maxWidth="xxl" position="relative">
        <Link to="/" style={{position:'absolute',top:'10px',textDecoration:'none'}}>
        <Button startIcon={<ArrowBackIcon/>}>Назад</Button>
        </Link>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={10} xl={6}>
          <Stack direction={'column'} spacing={3}>
            {
            status=='loading'
            ?'loading'
            :<PostImage src={currentPost.postImg}/>
            }
            <Typography variant='h2' component={'h2'}>
              {status=='loading'?'loading':currentPost.title}
              </Typography>
            <Stack direction="row" alignItems={'center'} spacing={1}>
              <CalendarMonthIcon/>
              <Typography variant="h6" color="grey" component="p">
              {
                status=='loading'
                ?'loading'
                :new Date(currentPost.created_at).toLocaleDateString()}
              </Typography>
            </Stack>

            <Stack direction="column" spacing={2}>
              <Typography variant="subtitle1" component="p">
              {
                status=='loading'?'loading':currentPost.content
              }
              </Typography>
              <Stack direction="row" spacing={2}>
                {
                  status!='loading'&& currentPost.tags
                  ?currentPost.tags.map((tag,id)=>(
                    <Chip size="large" color="primary" label={`# ${tag}`} />
                  ))
                  :new Array(3).map(el=>(
                    <Chip size="large" color="primary" label={`#loading`} />
                  ))
                }
              </Stack>
            </Stack>

            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={1}>
                  <IconButton>
                    <FavoriteBorderIcon/>
                  </IconButton>
                  <IconButton>
                    <BookmarkBorderIcon/>
                  </IconButton>
                </Stack>
                {
                  status!='loading'
                  &&(
                    <Stack direction={'row'} spacing={1}>
                  <VisibilityIcon/>
                  <Typography variant='body1' component={'p'}>
                      {currentPost.views}
                  </Typography>
                </Stack>
                  )
                }
                
            </Stack>
          </Stack>
          </Grid>
        </Grid>
        </Container>
      </Typography>
    </Box>
  );
};

export default PostPage;