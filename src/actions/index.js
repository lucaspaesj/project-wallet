// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCHED = 'FETCHED';
export const ERROR = 'ERROR';

export const actionLogin = (email) => ({ type: LOGIN, payload: email });

export const fetchSuccess = (responseApi) => ({ type: FETCHED, payload: responseApi });

export const fetchError = (error) => ({ type: ERROR, payload: error });

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};
