import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";


export const sendMesage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        // return res.status(404).json({
        //     success: false,
        //     message: "Please Fill Full Form",
        // }
        // )
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message Send Successfully!"
    })
})

export const getallMessage = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});

export const getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const messageData = await Message.findById(id);
        if (!messageData) {
            res.status(404).json({ message: "Message Data Not found" });
        }
        res.status(200).json({ messageData, message: `Message Data of id=${id} get succefully` });

    } catch (error) {
        res.status(404).json({ error, message: "Message not found" });
    }
}

export const delteOne = async (req, res) => {
    const id = req.params.id;
    try {

        const deletedData = await Message.findByIdAndDelete(id)
        if (!deletedData) {
            res.status(404).json({
                success: false,
                message: "Data not deleted "
            });
        }
        res.status(200).json({
            success: true,
            message: "Data deleted successfully"
        })
        const messageData = await Message.find();
        console.log(`Remaining Data ${messageData}`);

    } catch (error) {
        res.status(404).json({ error, message: "Check id" });
    }
}