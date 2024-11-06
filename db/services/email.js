const nodemailer = require('nodemailer');

const smtTransporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'dirppgcuritiba@gmail.com',
      pass: 'Jacare325@'
    },
});


async function sendResetEmail(email, token) {
  
  const resetLink = `exp://172.30.60.55:8081/--/appCalendario/resetarSenha?token=${token}`;
  const mailOptions = {
    from: 'dirppgcuritiba@gmail.com',
    to: email,
    subject: 'Redefinição de Senha',
    text: `Clique no link para redefinir sua senha: ${resetLink}`
  };

  try {
    await smtTransporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso");
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
  }
}

module.exports = { sendResetEmail };
