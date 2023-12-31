import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRequest, setCotation, updateExpenseEdited } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getRequest());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  resetExpenses = () => {
    this.setState({
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleClick = () => {
    const { dispatch, id } = this.props;

    dispatch(setCotation({ ...this.state, id }));
    this.resetExpenses();
  };

  handleClickEdit = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const expenseSelect = expenses.find((element) => element.id === idToEdit);
    console.log(expenseSelect);
    this.setState({
      id: expenseSelect.id,
      exchangeRates: expenseSelect.exchangeRates,
    }, () => dispatch(updateExpenseEdited(this.state)));
  };

  render() {
    const { apiDataCurrency, editor } = this.props;
    const { value, currency, description, method, tag } = this.state;
    return (
      <div>
        {!editor ? (
          <form>
            <label htmlFor="valor">
              Valor:
              <input
                data-testid="value-input"
                type="number"
                name="value"
                id="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="moeda">
              Moeda:
              <select
                data-testid="currency-input"
                name="currency"
                id="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {
                  apiDataCurrency.map((element) => (
                    <option key={ element }>{element}</option>
                  ))
                }
              </select>
            </label>

            <label htmlFor="description">
              Descrição:
              <input
                data-testid="description-input"
                type="text"
                name="description"
                id="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="method">
              Método de pagamento:
              <select
                data-testid="method-input"
                name="method"
                id="method"
                value={ method }
                onChange={ this.handleChange }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="tag">
              Categoria:
              <select
                data-testid="tag-input"
                name="tag"
                id="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>

            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </form>
        ) : (
          <form>
            <label htmlFor="valor">
              Valor:
              <input
                data-testid="value-input"
                type="number"
                name="value"
                id="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="moeda">
              Moeda:
              <select
                data-testid="currency-input"
                name="currency"
                id="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {
                  apiDataCurrency.map((element) => (
                    <option key={ element }>{element}</option>
                  ))
                }
              </select>
            </label>

            <label htmlFor="description">
              Descrição:
              <input
                data-testid="description-input"
                type="text"
                name="description"
                id="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="method">
              Método de pagamento:
              <select
                data-testid="method-input"
                name="method"
                id="method"
                value={ method }
                onChange={ this.handleChange }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="tag">
              Categoria:
              <select
                data-testid="tag-input"
                name="tag"
                id="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>

            <button
              type="button"
              onClick={ this.handleClickEdit }
            >
              Editar despesa
            </button>
          </form>)}
      </div>
    );
  }
}

WalletForm.propTypes = {
  apiDataCurrency: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  id: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  apiDataCurrency: state.wallet.currencies,
  id: state.wallet.expenses.length,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,

});

export default connect(mapStateToProps)(WalletForm);
