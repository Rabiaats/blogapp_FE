import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",

    initialState: {
        token:"",
        user:"",
        loading:"",
        error:"",
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        registerSuccess: (state, {payload}) => {
            state.token = payload.token
            state.user = payload.data
            state.loading = false
        },
        loginSuccess: (state, {payload}) => {
            state.token = payload.token
            state.user = payload.user
            state.loading = false
        },
        updateSuccess: (state, {payload}) => {
            console.log(payload)
            state.user = payload.new
            state.loading = false
        },
        logoutSuccess: (state) => {
            state.token = ""
            state.user = ""
            state.loading = false
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        }
    },
})
export const {fetchStart, loginSuccess, registerSuccess, fetchFail, logoutSuccess, updateSuccess} = authSlice.actions
export default authSlice.reducer

//! createAsycnTunk -> ile state güncellemek

//! değişiklikleri takip ederek güncellemek