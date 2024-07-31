interface AppointmentDto {
    date: Date;
    time: string;
    userId: string;
    status: 'active' | 'cancelled';
    serviceName: string;
}

export default AppointmentDto;
