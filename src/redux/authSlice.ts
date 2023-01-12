import { createSlice, AsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserLogin, LoginData } from "../pages/Login";

type LoginResponse = {
    data: UserLogin
}

export interface AuthInterface {
    loading: boolean;
    userToken: boolean | null;
    error: string | null;
    success: boolean;
}

export interface AuthState {
    auth: AuthInterface;
}

const initialState: AuthState = {
    auth: {
        loading: false,
        userToken: null,
        error: null,
        success: false,
    }
}

export const login = createAsyncThunk(
    "auth/login",
    async (loginData: LoginData, thunkAPI: any) => {
        try {
            const { email, password } = loginData;
            //config, data, headers, request, status, statusText
            //{ data: resData, headers: resHeaders } 
            const { data: resData, headers: resHeaders } = await axios.post<LoginResponse>(
                "http://localhost:4000/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true
                }
            );
            console.log(resData);
            console.log(resHeaders);
            return resData;
        }
        catch (error: any) {
            console.log(error);
            console.log(thunkAPI.rejectWithValue(error.message));
            return thunkAPI.rejectWithValue({
                status: error.response.data.status,
                message: error.response.data.message,
            }
            );
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action: PayloadAction<AuthInterface>) => {
            console.log(action);
            state.auth.loading = false;
            state.auth.success = true;
        })
        .addCase(login.rejected, (state, action: PayloadAction<any>) => {
            console.log(action);
            state.auth.loading = false;
            state.auth.success = false;
            state.auth.error = action.payload;
        })
        
    }
});

export const selectAuth = (state: RootState) => state.auth.auth;
export default authSlice.reducer;