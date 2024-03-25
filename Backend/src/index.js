import connectDb from "./db/index.js";
import dotenv from "dotenv"
import {app} from "./app.js"
dotenv.config({
    path:'./.env'
})

connectDb().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running on ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})
