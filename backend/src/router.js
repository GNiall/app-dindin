const express = require("express");
const {
  cadastrarUsuario,
  realizarLogin,
  alterarCadastro,
  listarUsuario,
} = require("./controllers/usuarios.controller");
const validarToken = require("./middlewares/validarToken");
const router = express();


router.post("/usuario", cadastrarUsuario);
router.post("/login", realizarLogin);

router.use(validarToken)

router.get("/usuario",listarUsuario);

router.put("/usuario/:id/editar",alterarCadastro);

module.exports = router;
