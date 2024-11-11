const nodemailer = require('nodemailer');

const smtTransporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'dirppgapp@gmail.com',
      pass: 'ccku irsh bnfd ummg'
    },
});


async function sendResetEmail(email, token) {
  
  const resetLink = `appCalendario://resetarSenha?token=${token}`;
  const mailOptions = {
    from: 'dirppgcuritiba@gmail.com',
    to: email,
    subject: 'Redefinição de Senha',
    text: `Clique no link para redefinir sua senha: ${resetLink}`,
    html: `<p>Clique no link para redefinir sua senha:</p><a href="${resetLink}">${resetLink}</a>` 
  };

  try {
    await smtTransporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso");
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
  }
}

module.exports = { sendResetEmail };
