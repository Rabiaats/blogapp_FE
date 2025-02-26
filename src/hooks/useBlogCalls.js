import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector} from "react-redux";
import { fetchFail, fetchStart, getBlogSuccess, getDataSuccess, myBlogs} from '../features/dataSlice';
import useAxios from './useAxios';
import { useNavigate } from "react-router-dom";
// import { getUserCatSuccess } from "../features/dataSlice";
// import { useNavigate } from "react-router-dom";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const {axiosToken} = useAxios();
  const navigate = useNavigate();
  
  // const {page} = useSelector(state => state.data);
  // const navigate = useNavigate();

  const getBlog = async (path, page = 1) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`${path}`);
      dispatch(getBlogSuccess({data, path}))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${path} çekme başarısız`)
    }
  }
  const getUserBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`blogs?author=${id}`);
      console.log(data);
      dispatch(myBlogs(data));
      getData("categories");
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const postLiked = async(blog) => {
    try {
      await axiosToken.post(`blogs/${blog._id}/postLike`);
    } catch (error) {
      console.log(error.message)
    }
  }

  const getData = async (path) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(path);
      dispatch(getDataSuccess({data, path}))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${path} çekme başarısız`)
    }
  }

  const singleData= async(path, id) =>{
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`${path}/${id}`);
      dispatch(getDataSuccess({data, path: "blog"}))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${path} çekme başarısız`)
    }
  }

  const getUserCat = async (userId, categoryId) => {
      dispatch(fetchStart())
      try {
        const [user, category] = await Promise.all([
          axiosToken("users/" + userId),
          axiosToken("categories" + categoryId),
        ])

        console.log(user)
        console.log(category)
        // const products = user.data.data
        // const sales = sale.data.data
        // const brands = brand.data.data
        // dispatch(getUserCatSuccess({products, sales, brands}))
      } catch (error) {
        dispatch(fetchFail())
      }
  }

  const deleteData = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`blogs/${id}`)
      getBlog("blogs");
      toastSuccessNotify("Silme işlemi başarılı")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Silme işlemi başarısız")
    }
  }

  const editData = async (path, id, data) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`${path}/${id}`, data)
      if(path === "blogs"){
        getBlog(path);
        navigate(-1);
      }else{
        getData(path)
      }
    } catch (error) {
      dispatch(fetchFail())
      console.log(error);
    }
  }

  const createData = async (path, createData) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(path, createData)
      if(path === "blogs"){
        getBlog(path);
      }else{
        getData(path)
      }
      toastSuccessNotify("Veri ekleme başarılı")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Veri ekleme başarısız")
    }
  }

  return {
    getBlog,
    getData,
    deleteData,
    editData,
    createData,
    getUserCat,
    postLiked,
    singleData,
    getUserBlogs
  }
}

export default useBlogCalls;