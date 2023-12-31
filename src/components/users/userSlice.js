import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    users: [],
    error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios
    .get('https://64e5781c09e64530d17e95b3.mockapi.io/contacts')
    .then(response => response.data)
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        })

        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })

        builder.addCase(fetchUsers.rejected, (state,action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer