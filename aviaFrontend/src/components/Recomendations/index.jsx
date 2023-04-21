import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import SideBar from '../SideBar';
import PostCardSm from '../PostCardSm';
import { useSelector } from 'react-redux';

const Recomendations = () => {
    const {posts,status}=useSelector(state=>state.posts)
    
    return(
        <SideBar>
                <Typography sx={{marginBottom:1}} variant='h4' component={'h5'}>Рекомендации</Typography>
                <Stack direction={'column'} sx={{marginBottom:2}} spacing={1}>
                {
                    status!='err'
                    ?
                    status=='loading'
                    ?(<Typography>Загрузка</Typography>)
                    :posts.slice(0,2).map((el,id)=>(
                        <PostCardSm key={id+1} {...el}/>
                    ))
                    :(<Typography>Возникла ошибка</Typography>)
                }
                </Stack>
                
                
                <Button variant="text" >Ещё...</Button>
        </SideBar>
    )   
};

export default Recomendations;