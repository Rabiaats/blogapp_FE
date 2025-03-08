import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';
import { changePage } from '../features/dataSlice';
// import { changePage, increasePage, resetData } from '../features/dataSlice';
import { Box, Stack } from '@mui/system';
// import { Box, display, Stack } from '@mui/system';
import { Button } from '@mui/material';
import Card from "../components/blog/Card"
import Loading from '../components/Loading';
import { useState } from 'react';


const Dashboard = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.data);
  const { getData } = useBlogCalls();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    getData('blogs')
  }, [dispatch]);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 300 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const showMoreItems = () => {
    setVisibleCount(prevCount => prevCount + 5);
  }

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const handleChange = (event, value) => {
  //   dispatch(changePage(value))
  // };
  
  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      {
        loading ? <Loading/> :

    <Stack>
      {blogs.length ? blogs.slice(0, visibleCount).filter((blog, index) => blog.isPublish === true).map((blog, index) => (
        <Card key={index} blog={blog}/>
      )) : 'Gosterilecek blog yok'
      }
    </Stack>
      }
      {/* {
        !loading &&
       <Stack spacing={2}>
      <Pagination page={page} onChange={handleChange} count={totalPages} color="error" />
    </Stack>
      } */}
      <div>
          {visibleCount < blogs.length && <button onClick={showMoreItems}>Daha Fazla</button>}
      </div>
      {isVisible && (
        <Button variant='contained' className="fixed bottom-0 right-[-40%]" onClick={handleClick}>
          Top
        </Button>
      )}
    </Box>
  );
};

export default Dashboard;
