import { Appointment } from "../entities/Appointment";
import AppointmentDto from "../dto/Appointment";
import appointmentRepository from "../repositories/AppointmentRepository";
import userRepository from "../repositories/UserRepository";
import { sendEmail } from "../utils/emailUtils";

// Obtener todas las citas
export const getAllAppointmentService = async (): Promise<Appointment[]> => {
    return await appointmentRepository.find();
};

// Obtener una cita por ID
export const getAppointmentByIdService = async (id: string): Promise<Appointment | null> => {
    return await appointmentRepository.findOneBy({ id });
};

// Crear una nueva cita
export const createAppointmentService = async (appointmentDto: AppointmentDto): Promise<Appointment> => {
    try {
        const user = await userRepository.findOneBy({ id: appointmentDto.userId });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const newAppointment = appointmentRepository.create({
            date: appointmentDto.date,
            time: appointmentDto.time,
            userId: appointmentDto.userId,
            serviceName: appointmentDto.serviceName,
            status: "active",
            user: user 
        });

        await sendEmail(
            user.email,
            'Confirmación de cita',
            'appointmentScheduled',
            { name: user.name, date: appointmentDto.date, time: appointmentDto.time, serviceName: appointmentDto.serviceName }
        );

        return await appointmentRepository.save(newAppointment);
    } catch (error) {
        console.error("Error al crear la cita:", error);
        throw new Error("Error al programar el turno");
    }
};

// Cancelar una cita
export const cancelAppointmentService = async (id: string): Promise<void> => {
    try {
        const appointment = await appointmentRepository.findOneBy({ id });
        if (!appointment) {
            throw new Error("Turno no encontrado");
        }

        appointment.status = "cancelled";
        await appointmentRepository.save(appointment);
        const user = await userRepository.findOneBy({ id: appointment.userId });

        if (user) {
            await sendEmail(
                user.email,
                'Cancelación de cita',
                'appointmentCancelled',
                { name: user.name, date: appointment.date, time: appointment.time }
            );
        }
    } catch (error) {
        console.error("Error al cancelar la cita:", error);
        throw new Error("Error al cancelar el turno");
    }
};
