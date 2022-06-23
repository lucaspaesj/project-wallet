import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/header.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
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
          <p data-testid="total-field">
            {
              expenses[0] ? expenses.reduce((partialSum, a) => partialSum + a, 0) : 0
            }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses[0]
    ? state.wallet.expenses.map((expense) => Math.trunc(Number((expense.value
      * expense.exchangeRates[expense.currency].ask * 100))) / 100)
    : [0],
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.number,
  ),
};

Header.defaultProps = {
  expenses: 0,
};

export default connect(mapStateToProps, null)(Header);
