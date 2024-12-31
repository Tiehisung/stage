import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const Mailer = async ({
  email,
  subject = "Receipt of message",
  text = "",
  type = "sent",
  html = "<h1>Thank you for contacting us.</h1><br/><hr/><p style={{border:'solid 1px gray',borderRadius:'4px',padding:'3px 2px'}}>Click <a href='https://konjiehifc.vercel.app/'> here</a> to visit the site.</p>",
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "stmp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "isoskode@gmail.com",
      pass: "mxlzkjvpkzhrjefa", //google generated app pass
    },
  });

  const mailOptions = {
    from: "isoskode@gmail.com",
    to: email,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    }
    return info;
  });
  //Resent
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    }
    return info;
  });
};
