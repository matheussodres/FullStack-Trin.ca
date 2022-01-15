import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

//Motivo da não utilização do useMemo 
//e não conseguir replicar ele dentro do projeto.

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [valor, setValor] = useState("");
  const [phone, setPhone] = useState("");
  const [bebida, setBebida] = useState("");
  const [valorTotal, setValorTotal] = useState("") ;
  const [dataFesta, setDataFesta] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone ? contact : null
    );

    if (!valor || !name || !phone || !bebida || !data) {
      return toast.warning("Por favor preencha todos os campos!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("Esse telefone já existe!!");
    }

    //if

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      valor,
      name,
      phone,
      bebida,
      valorTotal,
      dataFesta,
    };

    addContact(data);
    toast.success("Pessoa adiciona com sucesso!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Adicionar pessoa</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Telefone"
                value={phone}
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
                type="number"
                placeholder="Valor total"
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="date"
                placeholder="Escolha um dia"
                value={dataFesta}
                onChange={(e) => setDataFesta(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Adicionar pessoa!"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
