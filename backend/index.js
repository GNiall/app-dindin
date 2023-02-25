const express = require("express")
const cors = require('cors')
const  router  = require("./src/router/router.js")

const app = express()

app.use(express.json(),cors(),router)

app.listen(4000,()=>console.log("online na porta 4000"))