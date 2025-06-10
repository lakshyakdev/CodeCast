import app from "./app.js";
import { config } from "dotenv"; 
config();

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on server : http://localhost:${PORT}`);
})