const express = require("express");
const {
  listarUsuarios,
  listarCategorias,
  listarTransacoes,
  detalharTransacaoID,
  cadastrarTransacao,
  atualizarTransacaoID,
  deletarTransacaoID,
  listarExtrato,
} = require("./controllers/functions");
const {
  cadastrarUsuario,
  realizarLogin,
  alterarCadastro,
} = require("./controllers/usuarios.controller");
const validarToken = require("./middlewares/validarToken");
const router = express();

router.post("/usuario", cadastrarUsuario);
router.post("/login", realizarLogin);

router.use(validarToken);

router.get("/usuario", listarUsuarios);
router.put("/usuario/:id/editar", alterarCadastro);
router.get("/categoria", listarCategorias);
router.get("/transacoes", listarTransacoes);
router.get("/transacao/extrato", listarExtrato);
router.get("/transacao/:id", detalharTransacaoID);
router.post("/transacao", cadastrarTransacao);
router.put("/transacao/:id", atualizarTransacaoID);
router.delete("/transacao/:id", deletarTransacaoID);

module.exports = router;
