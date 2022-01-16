import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [data, setData] = useState("date");
  const [phone, setPhone] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone ? contact : null
    );

    if (!name || !phone || !valor) {
      return toast.warning("Por favor, complete os dados!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("Esse telefone já existe!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      data,
      name,
      phone,
      valor,
      descricao,
    };

    addContact(data);
    toast.success("Contato adicionar com sucesso!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      
      <h1 className="text-center text-dark py-3 display-2">Add Integrante</h1>
      
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
                type="date"
                placeholder=""
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Com bebida: 40 Sem bebida: 20"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  value={descricao}
                  placeholder={"Adicione aqui, se tem alguma observação."}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="ADICIONAR INTEGRANTE"
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
//©Desenvolvido 💜 por Matheus Sodré dos Santos