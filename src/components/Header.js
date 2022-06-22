import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/header.css';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header className="headerWallet">
        <h1>
          Wallet
        </h1>
        <h3>
          Email:
          <p data-testid="email-field">{ email }</p>
        </h3>
        <h3>
          Despesa total:
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
