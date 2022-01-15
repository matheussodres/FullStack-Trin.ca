// Sempre que iniciar o projeto vai vim esses dois como padrão!
const initialState = [
  { id: 0, name: "Matheus Sodré dos Santos", valor: "25", phone: 1234567890 },
  { id: 1, name: "Test Name", valor: "25", phone: "53981487107" },
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
      state = [{ name: null, valor: null, phone: null }];
      return state;
    default:
      return state;
  }
};
