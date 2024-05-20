import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// console.log(process.env.CORS_ORIGIN)

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import likeRouter from "./routes/like.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js";
import commentRouter from "./routes/comment.routes.js"
app.use("/api/v1/users",userRouter)
app.use("/api/v1/videos", videoRouter )
 app.use("/api/v1/likes", likeRouter);
 app.use("/api/v1/subscriptions", subscriptionRouter);
 app.use("/api/v1/comment", commentRouter);
export {app} 