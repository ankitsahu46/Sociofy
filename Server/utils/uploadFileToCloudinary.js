import { v2 as cloudinary } from "cloudinary";

const uploadFile = async (fileToUpload) => {
  const file = await cloudinary.uploader.upload(fileToUpload, {
    resource_type: "auto",
  });
  return file;
};

export { uploadFile };