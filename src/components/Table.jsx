import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Table extends Component {
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
}.isRequired;

export default connect(mapStateToProps)(Table);
