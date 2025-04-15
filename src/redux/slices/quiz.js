import { createSlice } from '@reduxjs/toolkit'

export const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        answer : [],            //state
    },
    reducers: {
        setanswer:(state,action)=>{
        state.answer = action.payload
       }
    },
})


// Action creators are generated for each case reducer function
export const { setanswer } = quizSlice.actions

export default quizSlice.reducer