import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { ...props } = this.props;
    if (props.loading === null) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        { props.loading ? <p>Carregando...</p>
          : (
            <label htmlFor="nome">
              Nome
              <input
                id="nameInputValue"
                type="text"
                data-testid="login-name-input"
                onChange={ props.changeState }
              />
              <input
                type="button"
                data-testid="login-submit-button"
                value="entrar"
                disabled={ props.buttonDisable }
                onClick={ props.createUser }
              />
            </label>)}
      </div>
    );
  }
}

Login.propTypes = {
  nameInputValue: PropTypes.string.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  changeState: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
};
Login.defaultProps = {
  loading: 'null',
};

export default Login;
