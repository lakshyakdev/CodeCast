import { config } from "dotenv"; 
config();
import app from "./app.js";
import dbConnection from "./config/dBconfig.js";

const PORT = process.env.PORT || 8080;

dbConnection();

app.listen(PORT,()=>{
    console.log(`Server is running on : http://localhost:${PORT}`);
})