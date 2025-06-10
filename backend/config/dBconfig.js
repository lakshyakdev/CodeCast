import mongoose from "mongoose";

const dbUrl = process.env.dbUrl || "mongodb://127.0.0.1:27017/FitLearn"

async function dbConnection() {
    try {   
        let {connection} = await mongoose.connect(dbUrl)
        if(connection){
            console.log("DataBase connected at",connection);
        }
    } catch (error) {
        console.log("Data base connection failed",error);
    }
}

export default dbConnection;