import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setData(currentContact.data);
    setPhone(currentContact.phone);
    setValor(currentContact.valor);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [phone, setPhone] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!name || !phone || !valor) {
      return toast.warning("Por favor, complete os dados!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("Esse telefone já existe!");
    }

    const data = {
      id: currentContact.id,
      data,
      name,
      phone,
      valor,
    };

    updateContact(data);
    toast.success("INTEGRANTE ATUALIZADO COM SUCESSO!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  placeholder={"Nome completo"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="date"
                  value={data}
                  placeholder={"Data"}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Telefone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={valor}
                  placeholder={"Valor"}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  ATUALIZAR
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  CANCELAR
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">SEM INTEGRANTES PARA ADICIONAR</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
//©Desenvolvido 💜 por Matheus Sodré dos Santos