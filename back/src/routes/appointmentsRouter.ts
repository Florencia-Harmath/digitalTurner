import { Router } from "express";
import { getAllAppointments, getAppointmentById, scheduleAppointment, cancelAppointment } from "../controllers/appointmentsController";

const router: Router = Router();

router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.post("/schedule", scheduleAppointment);
router.put("/cancel/:id", cancelAppointment);

export default router;
