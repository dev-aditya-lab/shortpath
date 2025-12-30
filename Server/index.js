import dotenv from 'dotenv';
import {app} from './app.js';
import connectDB from "./app/DB/index.db.js";
import { APP_NAME } from './app/config/constent.js';

dotenv.config();
const PORT = process.env.PORT || 8000;


connectDB().then(()=>{
    const server = app.listen(PORT,()=>{
        console.log(`${APP_NAME} Server is running on port ${PORT}`);
    })
    server.on('error',(error)=>{
        console.error("Server error:",error);
    });
})
.catch((error)=>{
    console.error("Failed to start server due to DB connection error: {file:index.js}",error);
});