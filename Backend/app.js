import express from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import router from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js"
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js"



const app = express();
config({ path: "./config/config.env" });     //.env file chya path/adress setup kele


app.use(
    cors({                     //frontend sathi cors cha use kele  FRONTEND_URL ani DASHBOARD_URL add keleahet
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);




//he 3 middlweare use krayche 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//routes settup krayche
app.use("/api/v1/message", router);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

//database connection 
dbConnection();

//errorMiddleware kaym end la use krayche
app.use(errorMiddleware);

export default app;