import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import useBlogCalls from "../../hooks/useBlogCalls";
import { Form } from "formik";
// import { Formik, Form, Field } from "formik";

import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  // Typography,
  // Box,
  // Grid,
  // Container,
} from "@mui/material";

export const validationSchema = Yup.object().shape({
  categoryId: Yup.string().required("Category is required"),
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.string().url().required("Image is required"),
  isPublish: Yup.boolean().required("Draft status is required"),
});

const BlogForm = ({
  isSubmitting,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  const { categories } = useSelector((state) => state.data);
  const { getData } = useBlogCalls();

  useEffect(() => {
    getData("categories");
  }, []);

  console.log(categories)
  return (
    <Form>
      <TextField
        sx={{ marginBottom: "1rem" }}
        select
        name="categoryId"
        label="Category"
        fullWidth
        onChange={handleChange}
        value={values?.categoryId}
        onBlur={handleBlur}
        margin="normal"
        error={touched.categoryId && Boolean(errors.categoryId)}
        helperText={touched.categoryId && errors.categoryId}
      >
        {categories?.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="title"
        name="title"
        id="title"
        type="text"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "1rem" }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values?.title}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
      />

      <TextField
        label="content"
        name="content"
        id="content"
        type="text"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        sx={{ marginBottom: "1rem" }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values?.content}
        error={touched.content && Boolean(errors.content)}
        helperText={touched.content && errors.content}
      />


      <TextField
        label="Image"
        name="image"
        id="image"
        type="url"
        variant="outlined"
        fullWidth
        onChange={handleChange}
        onBlur={handleBlur}
        value={values?.image}
        error={touched.image && Boolean(errors.image)}
        helperText={touched.image && errors.image}
      />

      <FormControl component="fieldset" margin="normal">
        <RadioGroup
          name="isPublish"
          value={values?.isPublish}
          onChange={handleChange}
        >
          <FormControlLabel value={true} control={<Radio />} label="Publish" />
          <FormControlLabel value={false} control={<Radio />} label="Draft" />
        </RadioGroup>
      </FormControl>

      <Button
        disabled={isSubmitting}
        variant="contained"
        type="submit"
        fullWidth
        sx={{ background: "#657AB8" }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default BlogForm;
