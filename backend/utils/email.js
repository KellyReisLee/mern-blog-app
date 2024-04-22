const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

const sendEmail = async (email, subject, link, username, intro, instructions, btnColor) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Kelly Development App",
        link: "https://kellydeveloper.vercel.app",
        copyright: `Copyright © ${new Date().getFullYear()} KellyWebDev. All rights reserved.`
      }
    });

    const emailContent = {
      body: {
        name: `${username} Appleseed`,
        intro: `${intro}`,
        action: {
          instructions: `${instructions}`,
          button: {
            color: `${btnColor}`,
            text: `${subject}`,
            link: `${link}`
          }

        },
        outro: [
          'If the button does not work, try this link:',
          `${link}`,
          'Need help, or have questions? Just reply to this email, we\'d love to help.'
        ]
      }
    };

    const emailBody = mailGenerator.generate(emailContent);
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: "Confirm Email",
      html: emailBody
    };

    await transporter.sendMail(message);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email not sent:", error);
  }
};

module.exports = sendEmail;
