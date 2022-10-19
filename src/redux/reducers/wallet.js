import { ADD_EXPENSES,
  EDIT_EXPENSE,
  GET_CURRENCY,
  REMOVE_EXPENSE,
  UPDATE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((element) => element !== 'USDT'),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.id,
    };
  case UPDATE_EXPENSE: {
    const expensesUpdated = state.expenses.map((element) => {
      if (action.payload.id === element.id) {
        return action.payload;
      }
      return element;
    });
    return {
      ...state,
      editor: false,
      expenses: expensesUpdated,
    };
  }
  default:
    return state;
  }
};

export default wallet;
