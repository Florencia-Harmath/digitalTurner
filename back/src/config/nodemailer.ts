import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAILNODEMAILER, PASSWORDNODEMAILER } from './envs';


const transporter = nodemailer.createTransport({
    service: EMAIL_HOST,
    auth: {
        user: EMAILNODEMAILER,
        pass: PASSWORDNODEMAILER
    },
});

export default transporter;
