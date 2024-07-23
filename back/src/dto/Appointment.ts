interface AppointmentDto {
    date: Date;
    time: string;
    userId: number;
    status: 'active' | 'cancelled';
    serviceName: string;
}

export default AppointmentDto;
