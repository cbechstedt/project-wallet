import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);

    const sum = expenses.reduce((acc, curr) => {
      const { exchangeRates } = curr;
      const { ask } = exchangeRates[curr.currency];
      acc += (curr.value * ask);
      return acc;
    }, 0);

    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ Number(sum).toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
