// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCHED = 'FETCHED';
export const ERROR = 'ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const actionLogin = (email) => ({ type: LOGIN, payload: email });

export const fetchSuccess = (responseApi) => ({ type: FETCHED, payload: responseApi });

export const fetchError = (error) => ({ type: ERROR, payload: error });

export const fetchExchange = (exchange) => ({ type: ADD_EXPENSE, payload: exchange });

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
