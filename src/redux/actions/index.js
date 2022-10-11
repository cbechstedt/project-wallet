export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_API = 'GET_API';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});
export const responseApi = (payload) => ({ type: GET_API, payload });

export const getRequest = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    // delete result.USDT;
    // Object.keys(result);
    dispatch(responseApi(result));
  } catch (e) {
    throw new Error(e);
  }
};
