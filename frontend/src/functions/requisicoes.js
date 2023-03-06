import { format } from "date-fns";
import instanceAxios from "../service";

const loadCategories = async (state, setState) => {
  try {
    const { data } = await instanceAxios.get("/categoria", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setState((prevState) => ({
      ...prevState,
      categorias: data.sort((a, b) => a - b),
    }));
  } catch (error) {
    console.error(error);
  }
};

const loadTransactions = async (state, setState, filtro) => {
  try {
    let response;
    if (!filtro) {
      response = await instanceAxios.get("/transacoes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } else {
      const categorias = filtro.join(",");
      response = await instanceAxios.get(`/transacoes?filtro=${categorias}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(categorias)
    }
    setState((prevState) => ({
      ...prevState,
      transacoes: response.data,
    }));
    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
};


const createTransaction = async (state, setState, categoriaId) => {
  try {
    const { valor, dataTransacao, tipo, descricao } = state;

    if (valor === "" || dataTransacao === "" || tipo === "") return;

    const transactionData = {
      descricao: descricao !== "" ? descricao : "-",
      valor,
      data: format(new Date(dataTransacao), "yyyyMMdd"),
      categoria_id: categoriaId,
      tipo,
    };

    const { data } = await instanceAxios.post("/transacao", transactionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setState((prevState) => ({ ...prevState, transacoes: data }));
    console.log(data);
    document.querySelector(".dialog-add").close();
  } catch (error) {
    console.error(error);
  }
};

const deleteTransaction = async () => {
  try {
    await instanceAxios.delete(
      `/transacao/${localStorage.getItem("idTransacao")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const loadResume = async (state, setState) => {
  try {
    const { data } = await instanceAxios.get(`/transacao/extrato`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setState({ ...state, extrato: data });
  } catch (error) {
    console.error(error);
  }
};

const editUser = async (state) => {
  try {
    if (
      !state.senha ||
      !state.confirmarSenha ||
      state.senha !== state.confirmarSenha
    )
      return;
    await instanceAxios.put(
      `/usuario/${localStorage.getItem("id")}/editar`,
      {
        nome: state.nome,
        email: state.email,
        senha: state.senha,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("editou");
    localStorage.setItem("nome", state.nome);
    localStorage.setItem("email", state.email);
  } catch (error) {
    console.error(error);
  }
};

const putTransactionById = async (state, setState, transacao) => {
  try {
    if (state.valor === "" || state.data === "" || state.tipo === "") return;
    const transactionData = {
      descricao: state.descricao !== "" ? state.descricao : "-",
      valor: state.valor,
      data: format(new Date(state.data), "yyyyMMdd"),
      categoria: state.categoria,
      tipo: state.tipo,
    };
    if (
      !transactionData.valor ||
      !transactionData.data ||
      !transactionData.categoria ||
      !transactionData.tipo
    )
      return;

    await instanceAxios.put(
      `/transacao/${transacao.id}/editar`,
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    localStorage.setItem("nome", state.nome);
    localStorage.setItem("email", state.email);
    setState((prevState) => ({ ...prevState }));
  } catch (error) {
    console.error(error);
  }
};
export {
  loadCategories,
  loadTransactions,
  createTransaction,
  deleteTransaction,
  loadResume,
  editUser,
  putTransactionById,
};
