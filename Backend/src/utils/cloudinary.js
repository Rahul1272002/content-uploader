import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });


  const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("Not tjsjsjj jskskks")
            return null}

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath) 
        return response;

    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath) 
        return null;
    }
}

const deleteCloudinary = async (public_id) => {
    try {
        if (!public_id) return null;

        //delete file from cloudinary
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: auto
        });
    } catch (error) {
        return error;
        console.log("delete on cloudinary failed", error);
    }
};
export {uploadCloudinary,deleteCloudinary}