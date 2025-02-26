import React from "react";
import { object, string } from "yup";
import Button from "@mui/material/Button";
import { Form } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const loginSchema = object({
  email: string()
    .required("Email zorunludur")
    .email("Lütfen geçerli bir email giriniz"),
  password: string()
    .required("Şifre zorunludur")
    .min(8, "Şifre en az 8 karakter içermelidir")
    .matches(/[a-z]+/, "Şifre en az bir küçük harf içermelidir")
    .matches(/[A-Z]+/, "Şifre en az bir büyük harf içermelidir")
    .matches(
      /[@$!%*?&]+/,
      "Şifre en az bir özel karakter (@$!%*?&.,) içermelidir"
    )
    .max(16, "Şifre en fazla 16 karakter içermelidir"),
});

const LoginForm = ({
  isSubmitting,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          onChange={handleChange}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          onBlur={handleBlur}
          helperText={touched.email && errors.email} // Hata mesajını göster
        />
        <TextField
          label="Password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          onChange={handleChange}
          value={values.password}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password} // Hata mesajını göster
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
};

export default LoginForm;
