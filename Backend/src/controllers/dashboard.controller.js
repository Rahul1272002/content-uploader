import mongoose from "mongoose"
import { Video } from "../models/Video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
   
})

const getChannelVideos = asyncHandler(async (req, res) => {
 
})

export {
    getChannelStats, 
    getChannelVideos
    }