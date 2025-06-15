import {Schema , model} from "mongoose";

const courseSchema = new Schema({
    title :{
        type : String,
        required : [true, "Course Title is required"],
        minLength : [5,"Course Title is too short"],
    },
    description :{
        type : String,
    },

    lesson :[{
        type: Schema.Types.ObjectId,
        ref: "Lesson",
    }],
    
    createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

    thumbnail: {
        publicId: String,
        url: String,
    },

    enrolledUsers: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        }
    ],

    accessLevel : {
        type: String,
        enum: ["FREE", "BASIC", "PREMIUM"],
        default: "FREE",
    },
},{timestamps:true});

const Course = model("Course",courseSchema);

export default Course;