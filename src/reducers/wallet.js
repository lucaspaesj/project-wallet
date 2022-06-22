// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITTIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default wallet;
