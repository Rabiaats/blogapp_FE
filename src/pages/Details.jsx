import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
// import { toastErrorNotify, toastWarnNotify } from "../helpers/ToastNotify";
// import useAxios from "../hooks/useAxios";
import { Box, Button } from "@mui/material";
// import { Box, Button, Stack } from "@mui/material";
// import {
//   CardHeader,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Avatar,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import {
//   Favorite as FavoriteIcon,
//   Share as ShareIcon,
//   MoreVert as MoreVertIcon,
//   ChatBubbleOutline as CommentIcon,
// } from "@mui/icons-material";
import useBlogCalls from "../hooks/useBlogCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useLocation, useNavigate } from "react-router-dom";
// import imgError from "../assets/imgError.png";
// import {
//   Favorite,
//   ChatBubbleOutline,
//   Send,
//   BookmarkBorder,
//   MoreVert,
//   Visibility,
// } from "@mui/icons-material";
import Card from "../components/blog/Card"
import { getDataSuccess } from "../features/dataSlice";
import CommentForm from "../components/blog/CommentForm";
import CommentCard from "../components/blog/CommentCard";
// const errorImg = "https://geekflare.com";

const Details = () => {
  const dispatch = useDispatch();
  const { blogID } = useParams();
  const { singleBlog } = useBlogCalls();
  const { blog } = useSelector((state) => state.data);
  const navigate = useNavigate();
  // const { page } = useSelector((state) => state.data);
  // const { postLiked, getData } = useBlogCalls();
  // const { user } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (blogID && !blogs.some(({_id}) => _id === blogID)) {
      singleBlog("blogs", blogID);
    }else{
      dispatch(getDataSuccess({data: blogs.find(({_id}) => _id === blogID), path: "blog"}))
    }
  }, [blogID]);

  useEffect(() => {
    if (!blogs.some(({_id}) => _id === blogID && blog !== '')) {
     setBlogs([...blogs, blog])
    }
  }, [blogID])
  
  return (
    <Box sx={{ display: "flex", flexDirection:"column",alignItems:"center", gap:"2rem" }}>
      {blog ? (
        <>
        <Card blog={blog}/>
        <CommentForm/>
        {
          blog.comments.map(comment => (
            <CommentCard comment={comment}/>
          ))
        }
        <Button variant="contained" sx={{bgcolor:"#657AB8"}} onClick={() => navigate("/")}>Ana Sayfa</Button>
        </>
      ) : (
        <p>Blog yükleniyor...</p>
      )}
    </Box>
  );
};

export default Details;
