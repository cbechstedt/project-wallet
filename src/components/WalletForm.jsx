import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRequest } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getRequest());
  }

  render() {
    const { responseApi } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="valor"
            id="valor"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
          />
        </label>

        <label htmlFor="moeda">
          Moeda:
          <select
            data-testid="currency-input"
            name="moeda"
            id="moeda"
          >
            {responseApi.map((element) => (
              <option key={ element }>{element}</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category">
          Categoria:
          <select
            data-testid="tag-input"
            name="category"
            id="category"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  responseApi: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  responseApi: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
