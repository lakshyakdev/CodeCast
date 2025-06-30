import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/AxiosInstance.js";

const initialState = {
    courses: [],
    selectedCourse: null,
    loading: false,
};

export const getAllCourses = createAsyncThunk("/courses", async (_ , {rejectWithValue})=>{
    try{
        const res = await axiosInstance.get("/courses/");
        return res.data;
    }
    catch(err){
        const msg = err?.response?.data?.message || "Course couldnot be fetched";
    }
})

export const viewCourse = createAsyncThunk("/courses/course", async ( id , {rejectWithValue})=>{
    try{
        const res = await axiosInstance.get(`/courses/${id}`);
        return res.data;
    }
    catch(err){
        const msg = err?.response?.data?.message || "Course couldnot be fetched";
    }
})

const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload?.allCourses;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error.message);
            })
            .addCase(viewCourse.fulfilled, (state, action) => {
                state.selectedCourse = action.payload?.course;
            })
            .addCase(viewCourse.rejected, (state, action) => {
                console.log(action.error.message);
            })
    }
});

export const {} = courseSlice.actions;
export default courseSlice.reducer;