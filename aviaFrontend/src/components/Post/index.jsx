import React from 'react';
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/AccountCircle'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addLike, addLikesHandler } from '../../redux/slices/postSlice';


const Post = ({title,content,views,tags,postImg,_id,likes,time}) => {
  const dispatch=useDispatch()
  const {isLiked}=useSelector(state=>state.posts)
  const likehandler=()=>{
    dispatch(addLikesHandler())
    dispatch(addLike({id:_id,isLiked}));
  }

  const shortenStr=(str)=>str.split(' ').length>55?str.split(' ').slice(0,54).join(' ')+'....':str
  return (
    <Card flexGrow={1} flexBasis={'100%'} width={'100%'}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            А
          </Avatar>
        }
        action={
          <>
          <IconButton onClick={likehandler} aria-label="settings">
            {isLiked
            ?<FavoriteIcon color='error'/>
            :<FavoriteBorderIcon />
            }
          
          </IconButton>
          <Typography sx={{marginX:'7px'}} component={'span'} variant="subtitle1">{isLiked?likes+1:likes}</Typography>
          <IconButton aria-label="settings">
            <ShareIcon />
          </IconButton>
          </>
        }
        title="Али Байсаров"
        subheader={new Date(time).toLocaleDateString()}
      />
      <CardMedia
        component="img"
        height="427"
        image={postImg}
        alt={title}
      />
      <CardContent padding={.7}>
        <Typography variant='h4' component={'h4'}>
          {title}
        </Typography>
        <Typography maxWidth={20} variant='subtitle1' component={'span'}>
         {
          shortenStr(content)
         }
        </Typography>
        <Stack marginY={2} direction={'row'} spacing={1}>
          {
            tags.map(tag=>(
              <Link to={`/tags/${tag}`} style={{textDecoration:'none'}}>
                <Chip color="primary" label={`# ${tag}`} clickable />
              </Link>
            ))
          }
              
            
          
          
        </Stack>
        <Stack direction={'row'} justifyContent="space-between">
          <Link style={{textDecoration:'none'}} to={'/posts/'+_id}>
            <Button variant="outlined">Подробнее</Button>
          </Link>
          <Box sx={{display:'flex',alignItems:'end',gap:.6}}>
          <VisibilityIcon/>
          <Typography variant={'subtitle2'} component={'span'}>{views}</Typography>
          </Box>
        </Stack>
      </CardContent>
      </Card>
  );
};

export default Post;