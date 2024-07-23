interface IAppointment {
    id: number;
    date: Date;
    time: string; 
    userId: number;
    status: 'active' | 'cancelled';
    serviceName: string;
}

export default IAppointment;