import React from "react";
// import { useEffect, useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import {
  Typography,
  Grid,
  Container,
} from "@mui/material";
// import { teal } from "@mui/material/colors";
// import useBlogCalls from "../hooks/useBlogCalls";
// import { useDispatch, useSelector } from "react-redux";
// import BlogForm, { validationSchema } from "../components/blog/BlogForm";
import BlogGrid from "../components/blog/BlogGrid";
import { useLocation } from "react-router-dom";
// import { useLocation, useParams } from "react-router-dom";

// import { getDataSuccess } from "../features/dataSlice";
// import Loading from "../components/Loading";
// import { fetchFail, fetchStart } from "../features/authSlice";

// Define the validation schema using Yup

export default function NewBlog () {
  
  const location = useLocation();
  const blog = location.state?.blog || {}; 

  console.log(blog)

  const initialValues = {
    categoryId: blog?.categoryId._id|| "",
    title: blog?.title || "",
    content: blog?.content || "",
    image: blog?.image || "",
    isPublish: blog?.isPublish || true,
  };

  return (
    <Container maxWidth="lg" sx={{ color: "#657AB8", padding: { xs: 0 } }}>
      <Grid
        container
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          p: { xs: 0, sm: 2 },
          alignItems: { xs: "center", sm: "normal" },
          gap: "5rem",
        }}
      >
        <Grid
          height={50}
          sx={{ display: { xs: "none", sm: "block" } }}
          item
          sm={12}
        >
          <Typography variant="h3" align="center">
            {blog ? "UPDATE BLOG" 
            :
            "CREATE NEW BLOG"
            }
          </Typography>
        </Grid>
        <BlogGrid initialValues={initialValues} id={blog._id}/>
      
      </Grid>
    </Container>
  );
}
