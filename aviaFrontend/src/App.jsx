import React, { useState } from "react";
import reactLogo from "./assets/react.svg";

import { Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { Router, Routes, Route, useLocation, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";

import TaggedPostsPage from "./pages/TaggedPostsPage";
import AuthorPage from "./pages/AuthorPage";
import { useTitle } from "./Hooks/useTitle.js";
import UserPage from "./pages/UserPage";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/slices/authSlice.js";
import RegisterPage from "./pages/RegisterPage";
import AuthAlert from "./components/AuthAlert";
import AnimatedPage from "./components/AnimatedPage";
import { AnimatePresence } from "framer-motion";
import ProfilePage from "./pages/ProfilePage";
import CategoryMainPage from "./pages/CategoryMainPage";
import PageLayout from "./components/PageLayout";
import WelcomePage from "./pages/WelcomePage";
function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.auth);
  useTitle();
  React.useLayoutEffect(() => {
    dispatch(getMe());
    if (isAuth == false) {
      redirect("/welcome");
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <AuthAlert />
      <AnimatePresence>
        <Routes key={location.pathname} location={location}>
          <Route path="/" exact element={<Home />} />

          <Route path="/welcome" exact element={<WelcomePage />} />

          <Route path="/tags/:tag" element={<TaggedPostsPage />} />
          <Route path="/categories" element={<CategoryMainPage />} />
          <Route path="/posts/:id" exact element={<PostPage />} />
          <Route path="/admin" exact element={<AuthorPage />} />
          <Route path="/user/:id" exact element={<UserPage />} />
          <Route path="/profile/:id" exact element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<RegisterPage />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
