import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

const maxCharacters = 5;

class Login extends Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
    redirecting: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyButton());
  };

  verifyButton = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > maxCharacters;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(addEmail(email));
    this.setState({ redirecting: true });
  };

  render() {
    const { isBtnDisabled, redirecting } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ isBtnDisabled }
          >
            Entrar
          </button>
          { redirecting && <Redirect to="/carteira" /> }
        </form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;
