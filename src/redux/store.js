import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/login'
import  quizSlice  from './slices/quiz'



export default configureStore({
  reducer: {
    login: loginReducer,
    quiz : quizSlice,
  },
})