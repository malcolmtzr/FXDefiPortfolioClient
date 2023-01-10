import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserInterface {
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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInterface>) => {
            state.user = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                notes: action.payload.notes,
                seq: action.payload.seq
            }
        },
        removeUser: (state, action: PayloadAction<UserInterface>) => {
            state.user = {
                id: null,
                name: null,
                email: null,
                notes: [],
                seq: null,
            }
        },
        //updateUser?
    }
});

//Action creators generated for each case reducer func
export const { setUser, removeUser } = userSlice.actions;

//Selector for user reducer
export const selectUser = (state: RootState) => state.user.user;

//Reducer function for userSlice (aliased: userReducer)
export default userSlice.reducer;