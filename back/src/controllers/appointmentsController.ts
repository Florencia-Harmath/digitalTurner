import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllAppointmentService, getAppointmentByIdService, updateAppointmentService } from "../services/appointmentServices";

// Obtener todas las citas
export const getAllAppointments = async (req: Request, res: Response): Promise<Response> => {
    try {
        const appointments = await getAllAppointmentService();
        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Error al cargar los turnos:", error);
        return res.status(500).json({ message: "Error al cargar los turnos" });
    }
};

// Obtener una cita por ID
export const getAppointmentById = async (req: Request, res: Response): Promise<Response> => {
    const appointmentId = req.params.id;
    try {
        const appointment = await getAppointmentByIdService(appointmentId);
        if (appointment) {
            return res.status(200).json(appointment);
        } else {
            return res.status(404).json({ message: "Turno no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el turno:", error);
        return res.status(500).json({ message: "Error al obtener el turno" });
    }
};

// Programar una nueva cita
export const scheduleAppointment = async (req: Request, res: Response): Promise<Response> => {
    const { date, time, userId, serviceName } = req.body;
    try {
        const newAppointment = await createAppointmentService({ date, time, userId, status: 'active', serviceName }); 
        return res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Error al programar el turno:", error);
        return res.status(400).json({ message: "Error al programar el turno" });
    }
};

// Cancelar una cita
export const cancelAppointment = async (req: Request, res: Response): Promise<Response> => {
    const appointmentId = req.params.id;
    try {
        await cancelAppointmentService(appointmentId);
        return res.status(200).json({ message: "Turno cancelado exitosamente" });
    } catch (error) {
        console.error("Error al cancelar el turno:", error);
        return res.status(500).json({ message: "Error al cancelar el turno" });
    }
};

// Editar un turno
export const updateAppointment = async (req: Request, res: Response): Promise<Response> => {
    const appointmentId = req.params.id;
    const { serviceName } = req.body; 
    try {
        const updatedAppointment = await updateAppointmentService(appointmentId, { serviceName });

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }

        return res.status(200).json({ message: "Turno actualizado con éxito", appointment: updatedAppointment });
    } catch (error) {
        console.error("Error al editar el turno:", error);
        return res.status(500).json({ message: "Error al editar el turno" });
    }
};
