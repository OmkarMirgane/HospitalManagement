import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A valid Email"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    nic: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        minLength: [8, "Password Must Conmtain At Least 8 Character"],
        required: true,
        select: false,          //when we get user details at that time this password is not get due to select:flase.
    },
    role: {
        type: String,
        require: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String,

    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});
// user save honya adhi tyane jo password enter kelay to bcrypt karaycha

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);   //ethe hash mdhe convert hoto password
})
//Login kartana....
//Enter kelela password ani to database madla password same ahe ka nahi check krnya sathi..
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


//create token 
//1)ek unique key/id deychi 2) ek secrete key deychi , 3)kadhi exprie honar token te deyche
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWD_EXPIRES,
    })
}

export const User = mongoose.model("User", userSchema);  