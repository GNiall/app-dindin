const pool = require("../service/instance");

async function listarUsuarios(req, res) {
  try {
    await pool.query(`SELECT * FROM usuarios;`);

    return res.json({
      id: req.usuario.id,
      nome: req.usuario.nome,
      email: req.usuario.email,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function listarCategorias(req, res) {
  try {
    const { rows } = await pool.query(`SELECT * FROM categorias;`);

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function listarTransacoes(req, res) {
  try {
    const { rows } = await pool.query(`SELECT * FROM transacoes;`);

    const insertData = rows.map((data) => {
      return {
        id: data.id,
        tipo: data.tipo,
        descricao: data.descricao,
        valor: data.valor,
        data: data.data,
        categoria_id: data.categoria_id,
        usuario_id: req.usuario.id,
      };
    });

    return res.status(200).json(insertData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function detalharTransacaoID(req, res) {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM transacoes WHERE id = $1`,
      [id]
    );

    if (rowCount === 0) {
      return res.status(400).json({ mensagem: "Transação não encontrada." });
    }

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function cadastrarTransacao(req, res) {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos devem ser preenchidos!" });
    }

    if (categoria_id >= 18) {
      return res.status(400).json({
        mensagem: "Categoria ID não existe, preencha um valor válido.",
      });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({ mensagem: "Informe um tipo válido!" });
    }

    const params = [descricao, valor, data, categoria_id, req.usuario.id, tipo];
    const { rows } = await pool.query(
      `INSERT INTO transacoes (
        descricao,
        valor,
        data,
        categoria_id,
        usuario_id,
        tipo
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      params
    );

    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function atualizarTransacaoID(req, res) {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        mensagem: "Informe um ID válido da Transação para atualização.",
      });
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos devem ser preenchidos!" });
    }

    const { rowCount } = await pool.query(
      `SELECT * FROM categorias WHERE categorias_id = $1`,
      [categoria_id]
    );

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: "Informe um ID válido da Transação para atualização.",
      });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({ mensagem: "Informe um tipo válido!" });
    }

    const params = [descricao, valor, data, categoria_id, tipo, id];
    await pool.query(
      `UPDATE transacoes 
      SET descricao = $1, 
      valor = $2, 
      data = $3, 
      categoria_id = $4, 
      tipo = $5 
      WHERE id = $6`,
      params
    );

    return res.status(201).json();
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deletarTransacaoID(req, res) {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(
      `SELECT * FROM transacoes WHERE id = $1`,
      [id]
    );

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: "Informe um ID existente para a exclusão da transação.",
      });
    }
    await pool.query("DELETE FROM transacoes WHERE id = $1", [id]);

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function listarExtrato(req, res) {
  try {
    const { rowCount } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1 or tipo = $2;`,
      ["entrada", "saida"]
    );

    if (rowCount === 0) {
      return res.status(200).json({
        entrada: 0,
        saida: 0,
      });
    }

    const { rows: entrada } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1`,
      ["entrada"]
    );

    const entryValue = entrada.map((value) => {
      return value.valor;
    });

    let entry = 0;

    for (const value of entryValue) {
      entry = entry + parseInt(value);
    }

    const { rows: saida } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1`,
      ["saida"]
    );

    const exitValue = saida.map((value) => {
      return value.valor;
    });

    let exit = 0;

    for (const value of exitValue) {
      exit = exit + parseInt(value);
    }

    return res.status(201).json({
      entrada: entry,
      saida: exit,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  listarUsuarios,
  listarCategorias,
  listarTransacoes,
  detalharTransacaoID,
  cadastrarTransacao,
  atualizarTransacaoID,
  deletarTransacaoID,
  listarExtrato,
};
