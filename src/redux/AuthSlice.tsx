import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { INIT_USER } from '@/types/initValueType';
type CurrentUser = {
    user: User;
    accessToken: string;
};

export const INIT_CURRENT_USER: CurrentUser = {
    user: INIT_USER,
    accessToken: '',
};

interface AuthState {
    currentUser: CurrentUser;
    isLoggedIn: boolean;
    err: boolean;
}

const initialState: AuthState = {
    currentUser: INIT_CURRENT_USER,
    isLoggedIn: false,
    err: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            state.err = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.err = false;
            state.currentUser = INIT_CURRENT_USER;
        },
        loginFailed(state) {
            state.isLoggedIn = false;
            state.err = false;
        },
        refresh(state, action) {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            state.err = false;
        },
    },
});

export const { loginSuccess, loginFailed, logout, refresh } = authSlice.actions;

export default authSlice.reducer;
