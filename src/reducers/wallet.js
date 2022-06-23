// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCHED, ERROR } from '../actions';

const INITTIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case FETCHED:
    return {
      ...state,
      currencies: Object.keys(action.payload).map((currencie) => currencie)
        .filter((currencie) => currencie !== 'USDT'),
    };
  case ERROR:
    return state;
  default:
    return state;
  }
};

export default wallet;
