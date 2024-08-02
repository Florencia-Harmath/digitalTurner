import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import transporter from '../config/nodemailer';

const renderTemplate = async (templateName: string, data: any) => {
    const filePath = path.join(__dirname, '../emailTemplates', `${templateName}.hbs`);
    const template = fs.readFileSync(filePath, 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(data);
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
