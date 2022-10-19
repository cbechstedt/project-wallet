import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { removeExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleClick = ({ target }) => {
    const { id } = target;
    // console.log(id);
    const { expenses, dispatch } = this.props;
    const stayedExpenses = expenses.filter((element) => element.id !== Number(id));
    // console.log(expenses);
    // console.log(stayedExpenses);
    dispatch(removeExpense(stayedExpenses));
  };

  handleClickEdit = ({ target }) => {
    const { id } = target;
    const { expenses, dispatch } = this.props;
    const expenseToEdit = expenses.find((element) => element.id === Number(id));
    console.log(expenses);
    console.log(expenseToEdit);
    dispatch(editExpense(expenseToEdit));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((element) => (
            <tr key={ element.id }>
              <td>{element.description}</td>
              <td>{element.tag}</td>
              <td>{element.method}</td>
              <td>{Number(element.value).toFixed(2)}</td>
              <td>{element.exchangeRates[element.currency].name}</td>
              <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(element.value)
                * Number(element.exchangeRates[element.currency].ask)).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ this.handleClickEdit }
                  id={ element.id }
                >
                  Editar
                </button>
                {' '}
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ this.handleClick }
                  id={ element.id }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
