import mongoose from "mongoose";

const connectDB = async (url) => {
  const options = {
    dbName: "sociofy_data"
  }
  try {
    await mongoose.connect(url, options);
    console.log("Database connected successfully.");
  }
  catch (err) { 
    console.log("Database connection error: " + err.message);
  }
}

export default connectDB;