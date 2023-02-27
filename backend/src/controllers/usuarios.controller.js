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
  if (!email.includes("@"))
    return res
      .status(400)
      .json({ mensagem: "Informe um email no formato valido" });
  try {
    const senhaCryptografada = await bcrypt.hash(senha, 10);
    const params = [nome, email, senhaCryptografada];

    const insertUser = await pool.query(
      `INSERT INTO  usuarios (
    nome,
    email,
    senha
    ) values ($1,$2,$3) returning *`,
      params
    );
    console.log;
    return res.json({
      usuario: {
        id: insertUser.rows[0].id,
        nome: insertUser.rows[0].nome,
        email: insertUser.rows[0].email,
      },
      token: insertUser.rows[0].senha,
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
  const { id } = req.params;
  const { nome, email, endereco, senha } = req.body;
  const senhaCryptografada = await bcrypt.hash(senha, 10);
  const params = [nome, email, endereco, senhaCryptografada, id];
  const update = await pool.query(
    `UPDATE usuarios SET nome = $1 ,email = $2 ,endereco = $3, senha = $4 WHERE id = $5 RETURNING *;`,
    params
  );

  res.json(update.rows);
}

async function listarUsuarios(req, res) {
  const usuarios = await pool.query(`select * from usuarios;`);

  return res.json(usuarios.rows);
}
module.exports = {
  cadastrarUsuario,
  realizarLogin,
  listarUsuarios,
  alterarCadastro,
};
