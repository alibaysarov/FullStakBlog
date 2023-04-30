import React from "react";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SideBar from "../SideBar";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InterestsIcon from "@mui/icons-material/Interests";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavMenu = ({ links }) => {
  const { user } = useSelector((state) => state.auth);
  let arr = new Array(7);
  console.log(arr);
  return (
    <SideBar
      elevation={3}
      sx={{ padding: 0, paddingY: 1, height: "fit-content" }}
    >
      <Box sx={{ backgroundColor: "background.paper" }}>
        <nav aria-label="main menu">
          {[
            {
              text: "Мой профиль",
              icon: <AccountCircleIcon />,
              link: `/profile/${user._id}`,
            },
            {
              text: "Свежие записи",
              icon: <ArticleIcon />,
              link: "/",
            },
            {
              text: "Категории",
              icon: <ConnectingAirportsIcon />,
              link: "/categories",
            },
            {
              text: "Рекомендации",
              icon: <InterestsIcon />,
            },
            {
              text: "Мои авторы",
              icon: <GroupIcon />,
            },
            {
              text: "Сохраненное",
              icon: <BookmarkIcon />,
            },
          ].map((item) => (
            <Link
              to={item.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </nav>
      </Box>
    </SideBar>
  );
};

export default NavMenu;
