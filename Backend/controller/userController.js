import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    //req.body mnje frontend kdun data yenarf ahe...
    const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
        return next(new ErrorHandler("Please Fill Form", 400));
    }

    //jr to email id vala user already asel database mdhe tr to double nahi save kraycha tyala ha message shoe kraycha
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("USer Already Registered", 400));
    }
    //user save krnya sathi..
    user = await User.create({ firstName, lastName, email, phone, password, gender, dob, nic, role: "Patient", });
    console.log(user);

    //TOken Generate kelele use kele tya mule res.status(200).json({ success: true, message: "User Registerd Successfully",res}) haycha jagi te token use kele
    generateToken(user, "User Registered!", 200, res)
    // res.status(200).json({ success: true, message: "User Registerd Successfully",res})
});


//Login controller

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details", 400));
    }

    //password ani confirmPassword same ahe ka check krnya sathi
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password And Confirm Password Do Not Match!", 400));
    }
    //find user by using entered email and also select password..
    //apm userShema mdhe password mdhe select:false kele ahe tye mule ethe password ghenya sathi select("+password")..jr + nahi dile tr error yeil
    const user = await User.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }
    //check entgered password is matche with database password  // this comprePassword method created in userSchema.js
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }
    //check role of user
    // console.log(role);
    // console.log(user);
    // console.log(user.email);
    // console.log(user.role);
    if (role !== user.role) {
        return next(new ErrorHandler("User With this role is not found", 400));
    }

    //Token use krayche 

    // res.status(200).json({
    //     success: true,
    //     message: "User Logged Successfully"
    // })

    generateToken(user, "User Login SUccessfully!", 200, res);

});


export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, phone, email, password, gender, dob, nic } = req.body;
    if (!firstName || !lastName || !phone || !email || !password || !gender || !dob || !nic) {
        return next(new ErrorHandler("Please Fill Full FOrm", 400));
    }

    const isRegistered = await User.findOne({ email });
    console.log(isRegistered);
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Alredy exists`));
    }
    //fkt admin role aslela add honya sathi
    const admin = await User.create({
        firstName,
        lastName,
        phone,
        email,
        password,
        gender,
        dob,
        nic,
        role: "Admin"
    });
    console.log(admin);

    res.status(200).json({
        success: true,
        message: "New Admin Register"
    })
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,

    })
});


export const addNewDoctor = (async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {

        return next(new ErrorHandler("Doctor Avatar Required!", 400));

    }

    const { docAvatar } = req.files;
    console.log(docAvatar.tempFilePath);
    console.log(docAvatar);

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(docAvatar.mimetype)) {

        return next(new ErrorHandler("File Format Not Supported!", 400));

    }

    const {

        firstName,

        lastName,

        email,

        phone,

        nic,

        dob,

        gender,

        password,

        doctorDepartment,

    } = req.body;

    if (

        !firstName ||

        !lastName ||

        !email ||

        !phone ||

        !nic ||

        !dob ||

        !gender ||

        !password ||

        !doctorDepartment ||

        !docAvatar

    ) {

        return next(new ErrorHandler("Please Fill Full Form!", 400));

    }

    const isRegistered = await User.findOne({ email });

    if (isRegistered) {

        return next(

            new ErrorHandler("Doctor With This Email Already Exists!", 400)

        );

    }

    const cloudinaryResponse = await cloudinary.uploader.upload(

        docAvatar.tempFilePath

    );
    console.log(cloudinaryResponse);

    if (!cloudinaryResponse || cloudinaryResponse.error) {

        console.error(

            "Cloudinary Error:",

            cloudinaryResponse.error || "Unknown Cloudinary error"

        );

        return next(

            new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)

        );

    }

    const doctor = await User.create({

        firstName,

        lastName,

        email,

        phone,

        nic,

        dob,

        gender,

        password,

        role: "Doctor",

        doctorDepartment,

        docAvatar: {

            public_id: cloudinaryResponse.public_id,

            url: cloudinaryResponse.secure_url,

        },

    });

    res.status(200).json({

        success: true,

        message: "New Doctor Registered",

        doctor,

    });

});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
        .json({
            success: true,
            message: "Admin Log Out Successfully"
        })
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
        .json({
            success: true,
            message: "Patient Log Out Successfully"
        })
});

