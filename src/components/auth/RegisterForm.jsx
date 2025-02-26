import React from 'react';
import { object, string } from "yup";
import Button from "@mui/material/Button";
import { Form } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Stack } from '@mui/material';
// import { useLocation } from 'react-router-dom';

export const registerSchema = object({
  email: string().required("Email zorunludur").email("Lütfen geçerli bir email giriniz"),
  password: string()
    .required("Şifre zorunludur")
    .min(8, "Şifre en az 8 karakter içermelidir")
    .matches(/[a-z]+/, "Şifre en az bir küçük harf içermelidir")
    .matches(/[A-Z]+/, "Şifre en az bir büyük harf içermelidir")
    .matches(/[@$!%*?.,&]+/, "Şifre en az bir özel karakter (@$!%*?&.,) içermelidir")
    .max(16, "Şifre en fazla 16 karakter içermelidir"),
  username: string().required("Kullanıcı adı zorunludur"),
  firstName: string().required("İsim girmek zorunludur"),
  lastName: string().required("Soyisim girmek zorunludur"),
  image: string().url("Resim linki giriniz")
});

const RegisterForm = ({
  isSubmitting,
  values,
  handleChange,
  handleBlur,
  errors,
  touched
}) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Stack sx={{ mb: 1 }} direction="row" spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            id="firstName"
            type="text"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName} 
          />
          <TextField
            label="Last Name"
            name="lastName"
            id="lastName"
            type="text"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
        </Stack>
        <TextField
          label="User Name"
          name="username"
          id="username"
          type="text"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          label="Password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Stack sx={{ mb: 1 }} direction="row" spacing={2}>
          <TextField
            label="Image"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.image}
            error={touched.image && Boolean(errors.image)}
            helperText={touched.image && errors.image}
          />
          <TextField
            label="City"
            name="city"
            id="city"
            type="text"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
        </Stack>
        <TextField
          label="Bio"
          name="bio"
          id="bio"
          type="text"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.bio}
        />
        <Button
          disabled={isSubmitting}
          variant="contained"
          type="submit"
          sx={{ background: "#657AB8" }}
        >
          Submit
        </Button>
      </Box>
    </Form>
  );
}

export default RegisterForm;
