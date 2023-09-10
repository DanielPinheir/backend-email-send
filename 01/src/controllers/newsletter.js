require("dotenv").config();

const transportador = require("../connections/nodemailer");
const knex = require("../connections/postgres");
const compiladorHtml = require("../utils/compiladorHtml");

cadastrarEmail = async (req, res) => {
  const { nome, email } = req.body;

  try {
    const emailExistente = await knex("emails").where({ email }).first();

    if (emailExistente) {
      return res.json({ mensagem: "Email já cadastrado." });
    }

    await knex("emails").insert({
      nome,
      email,
    });

    return res.status(201).json({ mensagem: "Cadastro efetuado com sucesso." });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const enviarNewsletter = async (req, res) => {
  const { texto } = req.body;

  try {
    const emails = await knex("emails");

    for (const email of emails) {
      const htmlNewsletter = await compiladorHtml(
        "./src/templates/newsletter.html",
        {
          usuario: email.nome,
          texto: texto,
        }
      );

      transportador.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}> `,
        to: `${email.nome} <${email.email}> `,
        subject: "Newsletter Day",
        html: htmlNewsletter,
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarEmail,
  enviarNewsletter,
};
