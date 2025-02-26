import React, { useState } from "react";
// import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import {
  Favorite,
  ChatBubbleOutline,
  Visibility,
} from "@mui/icons-material";
import useBlogCalls from "../../hooks/useBlogCalls";
import imgError from "../../assets/imgError.png";
import { timeCalc } from "../../helpers/TimeCalc";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { teal } from "@mui/material/colors";
// import { pink, teal } from "@mui/material/colors";
import { toastWarnNotify } from "../../helpers/ToastNotify";
import { useLocation, useNavigate } from "react-router-dom";
// import { getDataSuccess } from "../../features/dataSlice";
const errorImg = "https://geekflare.com";

export default function BlogCard({ blog }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [like, setLike] = useState(blog.likes.includes(user._id) ? true : false);
  const [likeLength, setLikeLength] = useState(blog.likes.length);
  // const { page } = useSelector((state) => state.data);
  const { postLiked, deleteData } = useBlogCalls();
  // const { singleData } = useBlogCalls();
  // const dispatch = useDispatch();

  const handleClick = async () => {
    if (user) {
      await postLiked(blog); // postLiked çağrısı tamamlanana kadar bekle
      // await getBlog("blogs", page);
      // if(location.pathname.includes("details")){
      //   singleData("blogs", blog._id)
      // }
      setLikeLength((item) => like ? item - 1 : item + 1)
      setLike(!like);
    } else {
      toastWarnNotify("Giriş yapmalısınız");
    }
  };

  return (
    <Card
      sx={{
        width:location.pathname === "/" || location.pathname === "/myBlog" ? { xs: "90%", sm: "400px", md: "450px", lg: "750px" } : {xs:"100%", sm:"90%"},
        m: 2,
        height: location.pathname === "/" && "520px",
        borderRadius: "1rem",
        padding:"0.5rem",
        bgcolor:teal[50],
        boxShadow:"0 0 5px 1px #657AB8"
      }}
    >
      {
        location.pathname !== "/" && 
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        title={blog.userId.username}
        subheader={blog.createAt}
      />
      }
      <Box
        sx={{ margin:"auto", width:{xs:"250px", sm:"300px"}, height:{xs:"280px", sm:"350px"}}}
      >
        <CardMedia
          component="img"
          image={blog.image.padStart(errorImg) ? imgError : blog.image}
          alt="post"
          sx={{width:"100%"}}
        />
      </Box>
      <CardActions disableSpacing>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" alignItems="center">
            <IconButton onClick={handleClick} aria-label="like">
              <Favorite
                color={like ? "error" : "gray"}
              />
            </IconButton>
            <Typography variant="body2">{likeLength}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButton aria-label="comment">
              <ChatBubbleOutline />
            </IconButton>
            <Typography variant="body2">{blog.comments.length}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButton aria-label="views">
              <Visibility />
            </IconButton>
            <Typography variant="body2">{blog.countOfVisitors}</Typography>
          </Stack>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        {
          location.pathname === "/" &&
        <Button
          onClick={() => navigate(`/details/${blog._id}`)}
          variant="contained"
          size="small"
          sx={{background:"#657AB8"}}
        >
          Read More
        </Button>
        }
      </CardActions>
      <CardContent>
        {
          location.pathname === "/" ?
            <Typography
          variant="body2"
          color="text.secondary"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2, // Maksimum 2 satır göster
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </Typography>
            : location.pathname === "/myBlog" ? 
            <Typography
          variant="body2"
          color="text.secondary"
          component="div"
        >
        { blog.content }
            </Typography>
            :
            <Typography
          variant="body2"
          color="text.secondary"
          component="div"
        >
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </Typography>
            
        }
      </CardContent>
      <Typography variant="caption" color="text.secondary" padding={"1rem"}>
        {timeCalc(blog.createdAt)}
      </Typography>
      {
        location.pathname === "/myBlog" || (blog.userId._id == user._id && location.pathname === `/details/${blog._id}`) && 
      <Box sx={{display:"flex", justifyContent:"center", gap:"1rem", mt:"0.5rem"}}>
        <Button onClick={() => navigate(`/newBlog`,{state:{blog}})} variant="contained">Update</Button>
        <Button onClick={() => deleteData(blog._id)} variant="contained">Delete</Button>
      </Box>
      }
    </Card>
  );
}
