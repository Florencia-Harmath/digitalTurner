import express from "express";
import { 
    getAllAppointments, 
    getAppointmentById, 
    scheduleAppointment, 
    cancelAppointment, 
    updateAppointment 
} from "../controllers/appointmentsController";
import { authenticateToken, authorizeRole } from "../middlewares/auth";

const router: express.Router = express.Router();

router.get("/", authenticateToken, authorizeRole(['admin']), getAllAppointments);
router.get("/:id", authenticateToken, getAppointmentById); 
router.post("/schedule", authenticateToken, authorizeRole(['user']), scheduleAppointment); 
router.put("/cancel/:id", authenticateToken, cancelAppointment);  
router.put("/update/:id", authenticateToken, authorizeRole(['admin']), updateAppointment); 

export default router;
