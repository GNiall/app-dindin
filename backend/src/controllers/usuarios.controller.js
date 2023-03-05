const pool = require("../service/instance");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaSegura = require("./senhaSegura");

async function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  if ([nome, email, senha].includes("undefined"))
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos!" });

  if ([!email].includes("@"))
    return res
      .status(400)
      .json({ mensagem: "Informe um email no formato valido" });

  try {
    const { rowCount } = await pool.query(
      `SELECT * FROM usuarios WHERE email = $1;`,
      [email]
    );

    if (rowCount > 0) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
    }

    const senhaCryptografada = await bcrypt.hash(senha, 10);
    const params = [nome, email, senhaCryptografada];

    const insertUser = await pool.query(
      `INSERT INTO  usuarios (
      nome,
      email,
      senha
      ) VALUES ($1, $2, $3) RETURNING *`,
      params
    );

    return res.json({
      id: insertUser.rows[0].id,
      nome: insertUser.rows[0].nome,
      email: insertUser.rows[0].email,
    });
  } catch (error) {
    if (
      error.message ===
      `duplicate key value violates unique constraint "usuarios_email_key"`
    )
      return res.status(400).json({ mensagem: "Email já cadastrado" });

    return res.status(500).json({ mensagem: error.message });
  }
}

async function realizarLogin(req, res) {
  const { email, senha } = req.body;

  if ([email, senha].includes("undefined"))
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos!" });

  try {
    const queryInsert = `SELECT * FROM usuarios WHERE email = $1`;
    const params = [email];
    const { rows, rowCount } = await pool.query(queryInsert, params);
    const senhaValida = await bcrypt.compare(senha, rows[0].senha);

    if (rowCount < 1 || !senhaValida)
      return res.status(400).json({ mensagem: "Email/Senha invalido!" });

    const token = jwt.sign(
      { id: rows[0].id, nome: rows[0].nome },
      senhaSegura,
      {
        expiresIn: "1d",
      }
    );

    const { senha: _, ...usuarioLogado } = rows[0];
    return res.json({ usuarioLogado, token });
  } catch (error) {
    if (
      error.message.includes(
        `Cannot read properties of undefined (reading 'senha')`
      )
    )
      return res.status(401).json({ mensagem: "Email/Senha invalido!" });
    return res.status(500).json(error.message);
  }
}

async function alterarCadastro(req, res) {
  const { id } = req.usuario;
  const { nome, email, senha } = req.body;

  const senhaCryptografada = await bcrypt.hash(senha, 10);
  const params = [nome, email, senhaCryptografada, id];
  await pool.query(
    `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4;`,
    params
  );

  res.status(200).json();
}

module.exports = {
  cadastrarUsuario,
  realizarLogin,
  alterarCadastro,
};
