// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCHED = 'FETCHED';
export const ERROR = 'ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UNEDIT_EXPENSE = 'UNEDIT_EXPENSE';
export const SORT_EXPENSES = 'SORT_EXPENSES';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';

export const actionLogin = (email) => ({ type: LOGIN, payload: email });

export const fetchSuccess = (responseApi) => ({ type: FETCHED, payload: responseApi });

export const fetchError = (error) => ({ type: ERROR, payload: error });

export const fetchExchange = (exchange) => ({ type: ADD_EXPENSE, payload: exchange });

export const deleteExpense = (expense) => ({ type: REMOVE_EXPENSE, payload: expense });

export const editExpense = (expense) => ({ type: EDIT_EXPENSE, payload: expense });

export const changeExpense = (expense) => ({ type: CHANGE_EXPENSE, payload: expense });

export const unedit = () => ({ type: UNEDIT_EXPENSE });

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

export const fetchApiExchange = ({
  value,
  description,
  currency,
  method,
  tag,
}) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(fetchExchange({
      value,
      description,
      currency,
      method,
      tag,
      data,
    }));
  } catch (error) {
    console.log(error);
    dispatch(fetchError(error));
  }
};
