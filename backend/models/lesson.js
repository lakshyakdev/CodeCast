import {Schema , model} from "mongoose";

const lessonSchema = new Schema({
        title : {
            type : String,
            required : [true, "Lesson Title is required"],
            minLength : [5,"Lesson Title is too short"],
        },
        description :{
            type : String,
        },
        lessonNumber:{
            type: Number,
            required : true,
        },
        videoUrl :{
            type : String,
        },
        docsUrl :{
            type : String,
        },
},{timestamps:true});

const Lesson = model("Lesson",lessonSchema);

export default Lesson;