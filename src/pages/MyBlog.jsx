
import React from 'react';
// import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import useBlogCalls from '../hooks/useBlogCalls';
// import { changePage, increasePage, resetData } from '../features/dataSlice';
import { Box } from '@mui/system';
// import { Box, display, Stack } from '@mui/system';
// import { Button, Pagination} from '@mui/material';
import Card from "../components/blog/Card"
import Loading from '../components/Loading';
// import { useNavigate } from 'react-router-dom';


const MyBlog = () => {
  // const { user } = useSelector((state) => state.auth);
  const { myBlogs, loading } = useSelector((state) => state.data);
  // const { myBlogs, loading, error } = useSelector((state) => state.data);
  // const { getUserBlogs } = useBlogCalls();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   getUserBlogs(user._id);
  // }, []);

  console.log(myBlogs)
    
  // const dispatch = useDispatch();
  // const { getData } = useBlogCalls();
  // const [isVisible, setIsVisible] = useState(false);
    return (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          {
            loading ? <Loading/> :
        <Box display="flex" justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"}>
          {myBlogs.length ? myBlogs.map((blog, index) => (
        <Card key={index} blog={blog}/>
      )) : 'Gosterilecek blog yok'
      }
        </Box>
}
        </Box>
      );
}

export default MyBlog