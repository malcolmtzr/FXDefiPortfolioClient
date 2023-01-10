import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserInterface {
    id: string | null;
    name: string | null;
    email: string | null;
    notes: Array<string>
    seq: number | null
}

export interface UserState {
    user: UserInterface
}

const initialState: UserState = {
    user: {
        id: null,
        name: null,
        email: null,
        notes: [],
        seq: null,
    },
}

//createSlice uses createAction and createReducer internally
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInterface>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = {
                id: null,
                name: null,
                email: null,
                notes: [],
                seq: null,
            }
        },
        //updateUser?
    },
    extraReducers: (builder) => {

    }
});

//Action creators generated for each case reducer func
export const { setUser, removeUser } = userSlice.actions;

//Selector for user reducer
export const selectUser = (state: RootState) => state.user.user;

//Reducer function for userSlice (aliased: userReducer)
export default userSlice.reducer;