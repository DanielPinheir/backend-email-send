const transportador = require("../email");
const compiladorHtml = require("../utils/compiladorHtml");

const usuario = {
  nome: "Daniel Pinheiro",
  email: "dyelzim@gmail.com",
  senha: "123abc",
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (usuario.email !== email) {
    return res.status(400).json({ mensagem: "Email ou senha inválidas" });
  }

  if (usuario.senha !== senha) {
    return res.status(400).json({ mensagem: "Email ou senha inválidas" });
  }

  const html = await compiladorHtml("./src/templates/newsletter.html", {
    nomeUsuario : usuario.nome
  })

  //Fazer envio de email

  transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}> `,
    to: `${usuario.nome} <${usuario.email}> `,
    subject: "Newsletter",
    html: html,
  });

  return res.json({ mensagem: "Login efetuado com sucesso." });
};

module.exports = login;
