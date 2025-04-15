import { createSlice } from '@reduxjs/toolkit'

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        registerUsers : [],            //state
    },
    reducers: {
        setRegisterUsers:(state,action)=>{
        state.registerUsers = action.payload
       }
    },
})


// Action creators are generated for each case reducer function
export const { setRegisterUsers } = registerSlice.actions

export default registerSlice.reducer

