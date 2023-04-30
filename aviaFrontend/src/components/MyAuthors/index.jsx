import React from "react";
import SideBar from "../SideBar";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSubs } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import SideBarSkeleton from "../SideBarSkeleton";

const MyAuthors = () => {
  const [loaded, setLoaded] = React.useState(false);
  const theme = useTheme();
  const {
    subs: { data, status },
    isAuth,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getSubs());
    setLoaded(true);
  }, []);
  return (
    <SideBar>
      <Typography sx={{ marginBottom: 1 }} variant="h4" component={"h5"}>
        Мои авторы
      </Typography>
      <Stack sx={{ marginY: 2 }} direction={"column"} spacing={3}>
        {status == "err" ? (
          <Typography variant="subtitle1" component={"span"}>
            Произошла ошибка
          </Typography>
        ) : status == "loading" ? (
          <Typography variant="subtitle1" component={"span"}>
            Загрузка ...
          </Typography>
        ) : (
          data.map((el, idx) => (
            <Link
              to={`/user/${el._id}`}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <Stack
                key={el._id}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <Avatar src={el.avatarUrl} />
                <Typography variant="subtitle1" component={"span"}>
                  {el.fullname}
                </Typography>
              </Stack>
            </Link>
          ))
        )}
      </Stack>
      <Button variant="text">Ещё...</Button>
    </SideBar>
  );
};

export default MyAuthors;
