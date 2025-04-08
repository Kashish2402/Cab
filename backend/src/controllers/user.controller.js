import {asyncHandler} from "../utils/asyncHandler.js"

const signup=asyncHandler(async(req,res,next)=>{
    const {username,email,age,password}=req.body
})