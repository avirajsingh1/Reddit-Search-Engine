const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connection successfull")
    }catch(error){
        console.error("MongoDb connection failed",error.message);
    }
};

module.exports=connectDb;