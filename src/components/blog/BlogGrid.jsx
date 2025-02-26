import { Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import BlogForm, { validationSchema } from "./BlogForm";
// import { teal } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import useBlogCalls from "../../hooks/useBlogCalls";

const BlogGrid = ({initialValues, id}) => {
  const { createData, editData } = useBlogCalls();

  const location = useLocation();
  return (
    <Grid sx={{ minHeight: { xs: "100vh", sm: "700px" } }}>
      <Grid
        item
        xs={12}
        sx={{
          border: { xs: 0, sm: "1px solid #657AB8" },
          padding: { xs: 0, sm: "2rem" },
          borderRadius: { xs: 0, sm: 20 },
        }}
      >
        <Grid item xs={12} sx={{ borderRadius: { xs: 0, sm: 20 } }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: { xs: "space-evenly", sm: "space-around" },
              flexDirection: "column",
              alignItems: "center",
              minHeight: { xs: "100vh", sm: "fit-content" },
              padding: "1rem",
            }}
          >
            <Grid sx={{ display: { xs: "block", sm: "none" } }} item sm={12}>
              <Typography variant="h3" align="center">
                {initialValues?.title ? "UPDATE BLOG" : "CREATE NEW BLOG"}
              </Typography>
            </Grid>

            <Box
              sx={{
                maxWidth: 600,
                margin: "auto",
                padding: 3,
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  //? POST (login)
                      !id
                      ? createData("blogs", values)
                      : editData("blogs",id, values);
                  //? Formu temizleme
                  actions.resetForm();
                  //? Mesaj (Toast)
                  //? Routing (Stock)
                  //? Global state güncellemsi (redux)
                  actions.setSubmitting(false); //? isSubmitting (Boolean)
                }}
                >
                {(props) => <BlogForm {...props} />}

              </Formik>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogGrid;
