const nodemailer = require("nodemailer");

// Data das férias
const vacationDate = new Date("2023-09-15");

// Configurações do transporte de email
const transport = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: "email@example.com",
    pass: "passwordExample",
  },
});

// Função que calcula quantos dias faltam para as férias começarem
function daysUntilVacation() {
  const today = new Date();
  const diffTime = vacationDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Função que envia o email
function sendEmail() {
  try {
    const days = daysUntilVacation();
    const message = `Faltam ${days} dias para as férias começarem!`;
    const mailOptions = {
      from: "email@example.com",
      to: "destinatario@example.com",
      subject: "Contagem regressiva para as férias",
      text: message,
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
}


// Envia o email diariamente
// setInterval(sendEmail, 24 * 60 * 60 * 1000);
sendEmail();