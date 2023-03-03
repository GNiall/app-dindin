import instanceAxios from "../service";

async function loadCategories(state, setState) {
  try {
    const { data } = await instanceAxios.get("/categoria", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setState({ ...state, categorias: data.sort((a, b) => a - b) });
  } catch (error) {
    console.log(error);
  }
}

async function loadTransactions(state, setState) {
  try {
    const { data } = await instanceAxios.get("/transacoes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setState({ ...state, transacoes: data });
  } catch (error) {
    console.log(error);
  }
}

async function createTransaction(state, setState) {
  try {
    const { data } = await instanceAxios.post("/transacao", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {
        descricao: state.descricao,
        valor: state.valor,
        data: state.data,
        categoria_id: state.categoria_id,
        usuario_id: localStorage.getItem("id"),
        tipo: "entrada",
      },
    });

    if (data) setState({ ...state, data });
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}
async function deleteTransaction(state, setState) {
  try {
    const { data } = await instanceAxios.delete(
      `/transacao/${localStorage.getItem("id")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setState({ ...state, transacoes: data });
  } catch (error) {
    console.log(error);
  }
}

export {
  loadCategories,
  createTransaction,
  deleteTransaction,
  loadTransactions,
};
