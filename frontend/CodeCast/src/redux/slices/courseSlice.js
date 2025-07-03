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

export const createCourse = createAsyncThunk("/course/create", async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("courses/", data);
        return res.data;
    } catch (e) {
        const errorMessage = e?.response?.data?.message || "Course Add failed failed";
        return rejectWithValue(errorMessage);
    }
});

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
            .addCase(createCourse.fulfilled, (state, action) => {
                state.courses.push(action.payload?.course);
            })
            .addCase(createCourse.rejected, (state, action) => {
                console.log(action.error.message);
            })
    }
});

export const {} = courseSlice.actions;
export default courseSlice.reducer;