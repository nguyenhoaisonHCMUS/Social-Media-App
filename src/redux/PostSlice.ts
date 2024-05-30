import { PostCardProps } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: PostCardProps[] = [];

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<PostCardProps>) => {
            state.push(action.payload);
        },
    },
    extraReducers(builder) {},
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
