import { createSlice } from '@reduxjs/toolkit'

export const careergoalSlice = createSlice({
    name: 'careergoal',
    initialState: {
        careerGoalUsers : [],            //state
    },
    reducers: {
        setCareerUsers:(state,action)=>{
        state.setCareerUsers = action.payload
       }
    },
})


// Action creators are generated for each case reducer function
export const { setCareerUsers } = careergoalSlice.actions

export default careergoalSlice.reducer

