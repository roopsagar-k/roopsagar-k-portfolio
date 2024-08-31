"use server";
import nodemailer from "nodemailer";

export async function sendMail(email: string, firstName: string, lastName:string, message: string) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

      try {
        const info = await transporter.sendMail({
          from: `"Portfolio" <${email}>`,
          to: "contact.roopsagarudayar@gmail.com",
          subject: "Contact Form Submission",
          text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
      } catch (error) {
        console.error("Error sending OTP: ", error);
        return { success: false, error: error instanceof Error ? error.message : error };
      }
}