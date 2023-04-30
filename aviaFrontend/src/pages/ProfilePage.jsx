import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PageLayout from "../components/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import Post from "../components/Post";
import { getUser } from "../redux/slices/user";
import { useLocation } from "react-router";
import { useTitle } from "../Hooks/useTitle";
import PostSkeleton from "../components/PostSkeleton";
const ProfilePage = () => {
  const UserBackGround = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "400px",
    overflow: "hidden",
    background:
      "radial-gradient(71.18% 579.63% at -7.12% 153.24%, #007DFF 0%, rgba(0, 125, 255, 0.5) 100%)",
  }));
  const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: "200px",
    height: "200px",
    position: "relative",
    transform: "translateY(-45%)",
    marginRight: "20px",
    maxWidth: "100%",
    border: "3px solid #fff",
  }));
  const dispatch = useDispatch();
  const { profileInfo, status } = useSelector((state) => state.user);
  const location = useLocation();
  const id = location.pathname.replace("/profile/", "");

  const mySubs = profileInfo.subsribtions?.length;
  const [isSubsriped, setIsSubscribe] = React.useState(false);
  const subscribeHandler = () => setIsSubscribe((prev) => !prev);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUser(id));
  }, []);
  // useTitle(profileInfo.fullname)
  return (
    <PageLayout>
      <Box>
        <Paper elevation={3} sx={{ borderRadius: 4, overFlow: "hidden" }}>
          <UserBackGround />
          <Stack
            marginBottom={3}
            sx={{ paddingX: 2, paddingBottom: 3, borderTop: "none" }}
            direction="horizontal"
            justifyContent={"space-between"}
          >
            <Stack direction="horizontal" spacing={7}>
              <UserAvatar src={profileInfo.avatarUrl} />
              <Stack direction="vertical" sx={{ flexDirection: "column" }}>
                <Typography variant="h2" component={"h2"}>
                  {profileInfo.fullname}
                </Typography>
                <Stack direction="horizontal" sx={{ gap: 3 }}>
                  <Typography variant="body1" component={"p"}>
                    22.6K Подписчиков
                  </Typography>
                  <Typography variant="body1" component={"p"}>
                    {mySubs} Подписок
                  </Typography>
                </Stack>
                <Typography component={"subtitle2"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  sapiente sequi optio harum quod. Voluptates at quas sunt
                  numquam sequi quisquam inventore placeat nemo.
                </Typography>
                <Box mt={1}>
                  {isSubsriped ? (
                    <Button onClick={subscribeHandler} variant="outlined">
                      Вы подписаны
                    </Button>
                  ) : (
                    <Button onClick={subscribeHandler} variant="contained">
                      Подписаться
                    </Button>
                  )}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, marginY: 5 }}>
          <Stack direction="row" spacing={2}>
            <Chip
              size={"large"}
              variant="contained"
              color="primary"
              label="Все публикации"
            />
            <Chip
              size={"large"}
              variant="outlined"
              color="primary"
              label="Публикации автора"
            />
          </Stack>
        </Paper>
        <Stack direction={"column"} spacing={3}>
          {status == "loaded"
            ? profileInfo.posts.map((post) => (
                <Post
                  title={post.title}
                  content={post.content}
                  views={post.views}
                  tags={post.tags}
                  postImg={post.postImg}
                  _id={post._id}
                  likes={post.likes}
                  time={post.created_at}
                />
              ))
            : [1, 2, 3, 4].map((el) => <PostSkeleton />)}
        </Stack>
      </Box>
    </PageLayout>
  );
};

export default ProfilePage;
