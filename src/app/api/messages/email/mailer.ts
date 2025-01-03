import nodemailer from "nodemailer";

interface MailerProps {
  email?: string;
  subject?: string;
  text?: string;
  html?: string;
}

export const Mailer = async ({
  email = '',
  subject = "Receipt of message",
  text = "",
  html = "<h1>Thank you for contacting us.</h1><br/><hr/><p style={{border:'solid 1px gray',borderRadius:'4px',padding:'3px 2px'}}>Click <a href='https://konjiehifc.vercel.app/'> here</a> to visit the site.</p>",
}: MailerProps) => {
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
