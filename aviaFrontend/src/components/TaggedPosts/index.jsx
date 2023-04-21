import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import Post from '../Post';
import { getPostsByTag } from '../../redux/slices/postSlice';
import { useLocation, useParams } from 'react-router-dom';
import { useTitle } from '../../Hooks/useTitle.js';

const TaggedPosts = () => {
  const dispath=useDispatch();
  const {taggedPosts,status}=useSelector(state=>state.posts)
  
  const {pathname} =useLocation()
  const isTaggedPosts=/\/tags\/[0-9A-Za-z]+/.test(pathname)
  const {tag}=useParams()
  React.useEffect(()=>{
    const getmeTaggedPost=async()=>{
      dispath(getPostsByTag({tag}))
      console.log(taggedPosts)
    }
    getmeTaggedPost()
    useTitle(`#${tag}`);
  },[tag])
  return (
    <Stack direction={'column'}  spacing={2} marginY={5}>
      {
        // !taggedPosts ||status=='loading'
        // ?<Typography variant={'h3'} component={'h4'}> Идет загрузка...</Typography>
        taggedPosts.length
        &&taggedPosts.map((post,id)=>(
          
            <Post
            key={id}
            _id={post._id} time={post.
            created_at}
            postImg={post.postImg}
            title={post.title}
            content={post.content}
            views={post.views}
            tags={post.tags}
            likes={post.likes}
            />
          
        ))
      }
    </Stack>
  );
};

export default TaggedPosts;