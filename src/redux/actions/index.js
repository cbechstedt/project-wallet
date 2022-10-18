export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});
export const apiDataCurrency = (payload) => ({ type: GET_CURRENCY, payload });

export const getRequest = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    dispatch(apiDataCurrency(result));
  } catch (e) {
    throw new Error(e);
  }
};

export const addExpenses = (state, exchangeRates) => (
  { type: ADD_EXPENSES, payload: { ...state, exchangeRates } }
);

export const setCotation = (state) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    dispatch(addExpenses(state, result));
  } catch (e) {
    throw new Error(e);
  }
};

export const removeExpense = (payload) => ({ type: REMOVE_EXPENSE, payload });
