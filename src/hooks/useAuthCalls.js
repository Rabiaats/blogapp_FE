import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateSuccess
} from "../features/authSlice";
import useAxios from "./useAxios";

const useAuthCall = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const {axiosToken} = useAxios();

  const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userData
      );
      toastSuccessNotify("Login işlemi başarılı");
      console.log(data)
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      toastErrorNotify("Login işlemi başarısız");
      dispatch(fetchFail());
    }
  };

  const register = async (userData) => {
    console.log(userData);
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        userData
      );
      toastSuccessNotify("Register işlemi başarılı");
      console.log(data);
      dispatch(registerSuccess(data));
      navigate("/");
    } catch (error) {
      toastErrorNotify("Register işlemi başarısız");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const update = async (userId, userData) => {
    navigate("/");
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.put(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`,userData);
      toastSuccessNotify("Update işlemi başarılı");
      dispatch(updateSuccess(data));
    } catch (error) {
      toastErrorNotify("Update işlemi başarısız");
      dispatch(fetchFail());
      console.log(error);
    }
  }

  const logout = async () => {
    dispatch(fetchStart)
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/logout`,
        { headers: { Authorization: `Token ${token}` } }
      );
      dispatch(logoutSuccess())
      navigate("/")
    } catch (error) {
      dispatch(fetchFail)
    }
  };

  return {
    login,
    register,
    logout,
    update
  };
};

export default useAuthCall;