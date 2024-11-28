import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGOURL, {
        dbName: "MERN_STACK_HOSPITAL_MANAGEMENR_SYSTEM"
    }).then(() => {
        console.log("Connected to Database");
    }).catch(err => {
        console.log(`Some Error Accured ${err}`);
    })
} 