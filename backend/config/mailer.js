import nodemailer from 'nodemailer';

// Create a transporter for Gmail using your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,    
    pass: process.env.EMAIL_PASS,    
  },
});


export default transporter;
