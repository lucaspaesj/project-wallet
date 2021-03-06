// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCHED,
  ERROR,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  UNEDIT_EXPENSE,
  CHANGE_EXPENSE,
} from '../actions';

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
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses,
        {
          id: state.expenses[0] ? state.expenses[state.expenses.length - 1].id + 1 : 0,
          value: action.payload.value,
          description: action.payload.description,
          currency: action.payload.currency,
          method: action.payload.method,
          tag: action.payload.tag,
          exchangeRates: action.payload.data,
        },
      ],
    };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return { ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case UNEDIT_EXPENSE:
    return { ...state,
      editor: false,
      idToEdit: 0,
    };
  case CHANGE_EXPENSE:
    return { ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
