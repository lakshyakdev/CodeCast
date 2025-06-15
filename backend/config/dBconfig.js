import mongoose from "mongoose";

const dbUrl = process.env.dbUrl || "mongodb://127.0.0.1:27017/CodeCast"

async function dbConnection() {
    try {   
        let {connection} = await mongoose.connect(dbUrl)
        if(connection){
            console.log("DataBase connected Successfully");
        }
    } catch (error) {
        console.log("Data base connection failed",error);
    }
}

export default dbConnection;