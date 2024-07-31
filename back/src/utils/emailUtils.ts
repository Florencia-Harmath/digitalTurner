import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import transporter from '../config/nodemailer';

const renderTemplate = async (templateName: string, data: any) => {
    const filePath = path.join(__dirname, '../emailTemplates', `${templateName}.html`);
    const template = fs.readFileSync(filePath, 'utf-8');
    return ejs.render(template, data);
};

export const sendEmail = async (to: string, subject: string, templateName: string, data: any) => {
    try {
        const html = await renderTemplate(templateName, data);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};
