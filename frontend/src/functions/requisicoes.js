import { format } from "date-fns";
import instanceAxios from "../service";

const loadCategories = async (state, setState) => {
try {
const { data } = await instanceAxios.get("/categoria", {
headers: {
Authorization: `Bearer ${localStorage.getItem("token")}`,
},
});
setState((prevState) => ({ ...prevState, categorias: data.sort((a, b) => a - b) }));
} catch (error) {
console.error(error);
}
};

const loadTransactions = async (state, setState) => {
try {
if (!setState) return;
const { data } = await instanceAxios.get("/transacoes", {
headers: {
Authorization: `Bearer ${localStorage.getItem("token")}`,
},
});
setState((prevState) => ({ ...prevState, transacoes: data }));
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
if (
!transactionData.valor ||
!transactionData.data ||
!transactionData.categoria_id ||
!transactionData.tipo
)
return;
const { data } = await instanceAxios.post("/transacao", transactionData, {
headers: {
Authorization: `Bearer ${localStorage.getItem("token")}`,
},
});
setState((prevState) => ({ ...prevState, transacoes: data }));
document.querySelector(".dialog-add").close();
} catch (error) {
console.error(error);
}
};

const deleteTransaction = async (state, setState, idTransacao) => {
try {
const { data } = await instanceAxios.delete(`/transacao/${idTransacao}`, {
headers: {
Authorization: `Bearer ${localStorage.getItem("token")}`,
},
});
setState((prevState) => ({ ...prevState, transacoes: data }));
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
setState((prevState) => ({ ...prevState, extrato: data }));
} catch (error) {
console.error(error);
}
};
export {
  loadCategories,
  createTransaction,
  loadResume,
  deleteTransaction,
  loadTransactions,
};