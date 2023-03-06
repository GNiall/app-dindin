const pool = require("../service/instance");

async function listarUsuarios(req, res) {
  const { id } = req.usuario;

  try {
    await pool.query(`SELECT * FROM usuarios WHERE id = $1;`, [id]);

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
    const id = req.usuario.id;
    const filtro = req.query.filtro;
    let query = `SELECT t.id as transacao_id, t.tipo, t.descricao, t.valor, t.data, t.categoria_id, t.usuario_id, 
      c.descricao as categoria_nome, c.id 
      FROM transacoes t 
      JOIN categorias c ON t.categoria_id = c.id 
      WHERE t.usuario_id = $1`;

    const params = [id];

    if (filtro) {
      const categorias = filtro.split(",");
      const placeholders = categorias.map((_, i) => `$${i + 2}`);
      query += ` AND c.descricao IN (${placeholders})`;
      params.push(...categorias);
    }

    const { rows } = await pool.query(query, params);
    const transacoes = rows.map((data) => ({
      id: data.transacao_id,
      tipo: data.tipo,
      descricao: data.descricao,
      valor: data.valor,
      data: data.data,
      categoria_id: data.categoria_id,
      usuario_id: data.usuario_id,
      categoria_nome: data.categoria_nome,
    }));
    console.log(transacoes);
    return res.status(200).json(transacoes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

async function detalharTransacaoID(req, res) {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await pool.query(
      `SELECT t.id as transacao_id, t.tipo, t.descricao, t.valor, t.data, t.categoria_id, t.usuario_id, 
      c.descricao as categoria_nome, c.id as id_categoria 
      FROM transacoes t join categorias c ON t.categoria_id = c.id WHERE t.id = $1;`,
      [id]
    );

    if (rowCount === 0) {
      return res.status(400).json({ mensagem: "Transação não encontrada." });
    }
    const insertData = rows.map((data) => {
      return {
        id: data.transacao_id,
        tipo: data.tipo,
        descricao: data.descricao,
        valor: data.valor,
        data: data.data,
        categoria_id: data.categoria_id,
        usuario_id: req.usuario.id,
        categoria_nome: data.categoria_nome,
      };
    });

    return res.status(200).json(insertData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function cadastrarTransacao(req, res) {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const { id } = req.usuario;

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

    const { rows } = await pool.query(
      `SELECT t.id as transacao_id, t.tipo, t.descricao, t.valor, t.data, t.categoria_id, t.usuario_id, 
      c.descricao as categoria_nome, c.id 
      FROM transacoes t join categorias c ON t.categoria_id = c.id WHERE usuario_id = $1;`,
      [id]
    );

    const params = [descricao, valor, data, categoria_id, req.usuario.id, tipo];
    const { rows: insertData } = await pool.query(
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

    return res.status(201).json({
      id: insertData[0].id,
      tipo: insertData[0].tipo,
      descricao: insertData[0].descricao,
      valor: insertData[0].valor,
      data: insertData[0].data,
      usuario_id: insertData[0].usuario_id,
      categoria_id: insertData[0].categoria_id,
      categoria_nome: rows[0].categoria_nome,
    });
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
      `SELECT * FROM transacoes WHERE categoria_id = $1`,
      [categoria_id]
    );

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: "Informe uma categoria válida da Transação para atualização.",
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
  const { id } = req.usuario;

  try {
    const { rowCount } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1 or tipo = $2 and usuario_id = $3;`,
      ["entrada", "saida", id]
    );

    if (rowCount === 0) {
      return res.status(200).json({
        entrada: 0,
        saida: 0,
      });
    }

    const { rows: entrada } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1 and usuario_id = $2`,
      ["entrada", id]
    );

    const entryValue = entrada.map((value) => {
      return value.valor;
    });

    let entry = 0;

    for (const value of entryValue) {
      entry += parseInt(value);
    }

    const { rows: saida } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1 and usuario_id = $2`,
      ["saida", id]
    );

    const exitValue = saida.map((value) => {
      return value.valor;
    });
    let exit = 0;

    for (const value of exitValue) {
      exit += parseInt(value);
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
