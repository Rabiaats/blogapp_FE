
// import Typography from "@mui/material/Typography"
// import Avatar from "@mui/material/Avatar"
// import LockIcon from "@mui/icons-material/Lock"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { Link} from "react-router-dom"
import { Formik } from "formik";
import useAuthCall from "../hooks/useAuthCalls"
import { teal } from "@mui/material/colors"
// import { Button, TextField } from "@mui/material"

import { object, string } from "yup";
// import { Form } from "formik";


import LoginForm from "../components/auth/LoginForm"
// import LoginForm, {loginSchema} from "../components/auth/LoginForm"

const Login = () => {
  const {login} = useAuthCall();

  const loginSchema = object({
    email: string()
      .required("Email zorunludur")
      .email("Lütfen geçerli bir email giriniz"),
    password: string()
      .required("Şifre zorunludur")
      .min(8, "Şifre en az 8 karakter içermelidir")
      .matches(/[a-z]+/, "Şifre en az bir küçük harf içermelidir")
      .matches(/[A-Z]+/, "Şifre en az bir büyük harf içermelidir")
      .matches(
        /[@$!%*?.,&]+/,
        "Şifre en az bir özel karakter (@$!%*?&.,) içermelidir"
      )
      .max(16, "Şifre en falza 16 karakter içermelidir"),
  });

  return (
        <Grid bgcolor={teal[50]} sx={{width:{xs:300, sm:350}}} item>

          <Formik
          initialValues={{username:"", password:"", email:"", firstName:"", lastName:""}}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            //? POST (login)
            login(values)
            //? Formu temizleme
            actions.resetForm();
            //? Mesaj (Toast)
            //? Routing (Stock)
            //? Global state güncellemsi (redux)
            actions.setSubmitting(false); //? isSubmitting (Boolean)
            console.log(values)
          }}
          
          >
            {(props) => <LoginForm {...props}/>}
          </Formik>


          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>
  )
}

export default Login
