const express = require("express");
const {
  cadastrarUsuario,
  realizarLogin,
  alterarCadastro,
  listarUsuarios,
} = require("./controllers/usuarios.controller");
const validarToken = require("./middlewares/validarToken");
const router = express();


router.post("/usuarios", cadastrarUsuario);
router.post("/login", realizarLogin);

router.use(validarToken)

router.get("/usuarios",listarUsuarios);

router.put("/usuarios/:id/editar",alterarCadastro);

module.exports = router;
