import app from "./app.js";
import { config } from "dotenv"; 
import dbConnection from "./config/dBconfig.js";
config();

const PORT = process.env.PORT || 8080;

dbConnection();

app.listen(PORT,()=>{
    console.log(`Server is running on : http://localhost:${PORT}`);
})