import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost/merndb')
        console.log("DB Conectada");
    }catch(error){
        console.log(error);
    }    
};

export {connectDB};