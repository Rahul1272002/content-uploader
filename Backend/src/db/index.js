import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDb=async()=>{

    try {
        
    const connectionInstance=await mongoose.connect(`${process.env.MONOGODB_URI}`,)

     console.log(`MonogoDB connected ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error ",error)
        process.exit(1)
    }


}
export default connectDb