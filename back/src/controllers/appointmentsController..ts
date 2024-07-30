import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllAppointmentService, getAppointmentByIdService } from "../services/appointmentServices";

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAllAppointmentService();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(404).json({ message: "Error al cargar los turnos" });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    const appointmentId = parseInt(req.params.id);
    try {
        const appointmentById = await getAppointmentByIdService(appointmentId);
        if (appointmentById) {
            res.status(200).json(appointmentById);
        } else {
            res.status(404).json({ message: "Turno no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el turno" });
    }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
    const { date, time, userId, serviceName } = req.body;
    try {
        const newAppointment = await createAppointmentService({date, time, userId, status: 'active', serviceName});
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al programar el turno" });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    const aappointmentId = parseInt(req.params.id)
    try{
        await cancelAppointmentService(aappointmentId);
        res.status(200).json({ message: "turno cancelado exitosamente" })
    } catch  (error) {
        res.status(500).json({ messsage: "Error al cancelar el turno"})
    }
}