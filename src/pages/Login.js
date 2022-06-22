import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionLogin } from '../actions';

const MIN_CHARACTERS_PASSWORD = 6;
const REGEX_EMAIL = /\S+@\S+\.\S+/;

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
  }

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onClickSubmit = (e) => {
    const { submitLogin, history } = this.props;
    const { inputEmail } = this.state;
    submitLogin(inputEmail);
    e.preventDefault();
    history.push('/carteira');
  }

  render() {
    const { inputEmail, inputPassword } = this.state;
    return (
      <form>
        <h1>
          Login
        </h1>
        <label htmlFor="email-input">
          <input
            type="email"
            id="email-input"
            name="inputEmail"
            data-testid="email-input"
            placeholder="E-mail"
            value={ inputEmail }
            onChange={ this.onChangeInput }
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            id="password-input"
            name="inputPassword"
            data-testid="password-input"
            placeholder="Senha"
            minLength={ 6 }
            value={ inputPassword }
            onChange={ this.onChangeInput }
          />
        </label>
        <button
          type="submit"
          onClick={ this.onClickSubmit }
          disabled={
            !REGEX_EMAIL.test(inputEmail)
            || inputPassword.length < MIN_CHARACTERS_PASSWORD
          }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (email) => dispatch(actionLogin(email)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
