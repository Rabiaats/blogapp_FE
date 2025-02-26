import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  user: "",
  blog:"",
  myBlogs:[],
  categories: [],
  loading: false,
  error: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.path] = payload.data.data;
      state.totalPages = payload.data.details?.pages.total;
    },
    getDataSuccess: (state, { payload }) => {
      console.log(payload)
      state.loading = false;
      state[payload.path] = payload.data.data;
    },
    getUserBlogSuccess:(state, {payload}) => {
      state.loading = false
      state.user = payload.user
      state.blog = payload.blog
  }, // details sayfası icin
  myBlogs: (state, { payload }) => {
    state.myBlogs = payload.data;
    state.loading = false;
  },
    // fetchFail: (state) => {
    //   state.loading = false;
    //   state.error = true;
    // },
    // changePage: (state, {payload}) => {
    //   if(state.page <= state.totalPages){
    //     state.page = payload;
    //   }
    // },
    // resetData: (state, {payload}) => {
    //   state[payload.path] = [];
    //   state.page = 1;
    // }
  },
});

export const { fetchStart, getBlogSuccess, getDataSuccess, fetchFail, changePage, resetData, getUserBlogSuccess, myBlogs } = dataSlice.actions;

export default dataSlice.reducer;
