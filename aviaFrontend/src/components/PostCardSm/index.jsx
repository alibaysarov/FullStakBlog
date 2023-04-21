import { ListItemButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'mui-image'
import { useTheme } from '@emotion/react';
const PostCardSm = ({title,_id,postImg}) => {
    const renderTitle=str=>str.length>20?str.slice(0,20)+' ..':str
    const theme=useTheme()
    
    return (
        <Link to={`posts/${_id}`} style={{textDecoration:'none',color:"#000"}}>
        <ListItemButton>
            <Stack direction={'row'} spacing={3}>
                <Image style={{borderRadius:theme.shape.borderRadius}} width={80} height={50} fit={'cover'} showLoading={false} src={postImg}/>
                <Typography variant='subtitle1' component={'span'}>{renderTitle(title)}</Typography>
            </Stack>
        </ListItemButton>
            
        
        </Link>
        
    );
};

export default PostCardSm;