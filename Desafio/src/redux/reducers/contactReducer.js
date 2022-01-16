const initialState = [
  { id: 1, name: "Matheus Sodré dos Santos", telefone: "53981487107", valor: 25, bebida: "Sim", valorTotal: 25,  data: '04/06/1998', descricao: "Teste de Descricao"},
  { id: 2, name: "Otavio Moreira Sodré", telefone: "53981487107", valor: 25, bebida: "Sim", valorTotal: 25,  data: '04/06/1998', descricao: "Teste de Descricao"},
];

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ name: null, telefone: null, valor: null,  data: null }];
      return state;
    default:
      return state;
  }
};
//©Desenvolvido 💜 por Matheus Sodré dos Santos