import { Appointment } from "./../entities/Appointment";
import AppointmentDto from "../dto/Appointment";
import appointmentRepository from "../repositories/AppointmentRepository";
import userRepository from "../repositories/UserRepository";

export const getAllAppointmentService = async (): Promise<Appointment[]> => {
  const appointments = await appointmentRepository.find();
  return appointments;
};

export const getAppointmentByIdService = async (id: number) => {
  const appointment = await appointmentRepository.findOneBy({
    id,
  });
  return appointment;
};

export const createAppointmentService = async (
  appointment: AppointmentDto
): Promise<Appointment> => {
  try {
    const user = await userRepository.findOneBy({ id: appointment.userId });
    if (user) {
      const newAppointment = appointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        userId: appointment.userId,
        serviceName: appointment.serviceName,
        status: "active",
      });
      newAppointment.user = user;
      await appointmentRepository.save(newAppointment);

      return newAppointment;
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error al programar el turno");
  }
};

export const cancelAppointmentService = async (id: number): Promise<void> => {
  const appointment = await appointmentRepository.findOneBy({
    id,
  });
  if (appointment) {
    appointment.status = "cancelled";
    await appointmentRepository.save(appointment);
  } else {
    throw new Error("Turno no encontrado");
  }
};
