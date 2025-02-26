// import Container from "@mui/material/Container"
// import Typography from "@mui/material/Typography"
// import Avatar from "@mui/material/Avatar"
// import LockIcon from "@mui/icons-material/Lock"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { Link, useLocation} from "react-router-dom"
import { Formik } from "formik";
import useAuthCall from "../hooks/useAuthCalls"
import { teal } from "@mui/material/colors"

import RegisterForm, {registerSchema} from "../components/auth/RegisterForm"

const Register = ({initialValues, userId}) => {
  const {register, update} = useAuthCall();
  const location = useLocation();
  // const navigate = useNavigate();

  return (
        <Grid bgcolor={teal[50]} sx={{width:{xs:300, sm:350}}} item>

          <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values, actions) => {
            //? POST (register)
            if(location.pathname === "/auth"){

              register(values)
            }else{
              update(userId,values)
            }
            //? Formu temizleme
            actions.resetForm();
            //? Mesaj (Toast)
            //? Routing (Stock)
            //? Global state güncellemsi (redux)
            actions.setSubmitting(false); //? isSubmitting (Boolean)
            console.log(values)
          }}
          
          component={(props) => <RegisterForm {...props}/>}
          >
          </Formik>


          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>
  )
}

export default Register
