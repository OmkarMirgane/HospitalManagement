import express from "express";
import { delteOne, getallMessage, getOne, sendMesage } from "../controller/messageController.js";

const router = express.Router();

router.post("/send", sendMesage);
router.get("/getAllMessage", getallMessage);
router.get("/getOne/:id", getOne);
router.delete("/delteOne/:id", delteOne);

export default router;
