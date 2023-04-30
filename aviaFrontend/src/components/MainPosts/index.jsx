import { Stack } from "@mui/system";

import React from "react";
import Post from "../Post";
import axios from "axios";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/slices/postSlice";
import PostSkeleton from "../PostSkeleton";
const MainPosts = () => {
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const isTaggedPosts = /\/tags\/[0-9A-Za-z]+/.test(pathname);
  React.useEffect(() => {
    dispatch(getPosts());
    const getMeTaggedPosts = async (tag) => {
      const { data } = await axios.get(`http://localhost:5000/tags/${tag}`);
      setLoaded(true);
      setPosts((prev) => [...data]);
    };
  }, []);
  return (
    <Stack direction={"column"} spacing={3} marginY={5}>
      {status == "loaded"
        ? posts.map((post, id) => (
            <Post
              key={id}
              _id={post._id}
              time={post.created_at}
              postImg={post.postImg}
              title={post.title}
              content={post.content}
              views={post.views}
              tags={post.tags}
              likes={post.likes}
            />
          ))
        : [1, 2, 3, 4].map((el) => <PostSkeleton />)}
    </Stack>
  );
};

export default MainPosts;
