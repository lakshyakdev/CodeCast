import { configureStore } from "@reduxjs/toolkit"
import authSliceReducers from "./slices/authSlice.js"
import courseSliceReducers from "./slices/courseSlice.js"
const store = configureStore({
    reducer : {
        auth : authSliceReducers,
        course : courseSliceReducers,
    },
    devTools : true,
}) ;

export default store;