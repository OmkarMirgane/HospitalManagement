import app from "./app.js";
import cloudinary from "cloudinary";

//clodinary setup ethe kraycha 
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.COLUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//app listen kele
app.listen(process.env.PORT, () => {
    console.log(`Server Listening on port ${process.env.PORT}`);
})