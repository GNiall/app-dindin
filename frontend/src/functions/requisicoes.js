import instanceAxios from "../service";



async function loadCategories() {
  try {
    const { data } = await instanceAxios.get("/categoria", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data.sort((a, b) => a - b);
  } catch (error) {
    console.log(error);
  }
}

async function loadTransactions() {
  try {
    const { data } = await instanceAxios.get("/transacao", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export { loadCategories, loadTransactions };
