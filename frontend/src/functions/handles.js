
export default function handleSubmit(event, form, setForm) {
  const { inputName, inputEmail, inputPassword } = form;

  event.preventDefault();

  setForm({ ...form, Alert: null });

  if (!inputName || !inputEmail || !inputPassword) {
    return setForm({ ...form, Alert: "Preencha todos os campos" });
  } else {
    setForm({
      ...form,
      inputName: "",
      inputEmail: "",
      inputPassword: "",
    });
  }
}
