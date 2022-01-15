import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

//Motivo da não utilização do useMemo 
//e não conseguir replicar ele dentro do projeto.
const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setValor(currentContact.valor);
    setPhone(currentContact.phone);
    setBebida(currentContact.bebida);
    setValorTotal(currentContact.valorTotal);
    setDataFesta(currentContact.dataFesta);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [valor, setValor] = useState("");
  const [phone, setPhone] = useState("");
  const [bebida, setBebida] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [dataFesta, setDataFesta] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id ? contact: null
    );

    if (!valor || !name || !phone || !bebida) {
      return toast.warning("Por favor, completo os dados!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("Esse telefone já existe");
    }

    const data = {
      id: currentContact.id,
      valor,
      name,
      phone,
      bebida,
      valorTotal,
      dataFesta,
    };

    updateContact(data);
    toast.success("Update realizado com sucesso!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          VOLTAR
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Nome"}
                  onChange={(e) => setName(e.target.value)}
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
                type="text"
                placeholder="Vai querer bebida?"
                value={bebida}
                onChange={(e) => setBebida(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Valor total: "
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="date"
                placeholder="Escolha a data"
                value={dataFesta}
                onChange={(e) => setDataFesta(e.target.value)}
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
            <h1 className="text-center">Nada foi encontrado!</h1>
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
