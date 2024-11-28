import express from "express";
import { addNewAdmin, getAllDoctors, login, patientRegister, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor } from "../controller/userController.js";
import { isPatientAuthenticated, isAdminAuthenticated } from "../middlewares/auth.js"


const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnewadmin", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isPatientAuthenticated, addNewDoctor);


export default router;