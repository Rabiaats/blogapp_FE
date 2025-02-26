import React from 'react'
// import RegisterForm from '../components/auth/RegisterForm'
import { useSelector } from 'react-redux'
import Register from './Register';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = ({initialValues}) => {
    const {user} = useSelector(state => state.auth);
    if(user){
      initialValues = {...initialValues, username:user.username, password:"", email:user.email, firstName:user.firstName, lastName:user.lastName, image:user.image, city:user.city, bio:user.bio}
    }
  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"1rem"}}>
      <Box
      sx={{border:"1px solid gray", borderRadius:"50%", width:"200px", height:"200px", display:"flex", justifyContent:"center", alignItems:"center"}}
            >
                  {
                    user.image ? 
                    <img
                      src={user.image}
                      alt={user.username}
                      width={100}
                      className="h-8 w-8 rounded-full p-0"
                      referrerPolicy="no-referrer"
                    /> : 
                    <AccountCircleIcon sx={{ color: "#787F9E" }} fontSize="large" />
                  }
            </Box>
            <Typography textTransform={"capitalize"}>{user.firstName} {user.lastName}</Typography>
        <Register initialValues={initialValues} userId={user._id}/>
    </Box>
  )
}

export default Profile