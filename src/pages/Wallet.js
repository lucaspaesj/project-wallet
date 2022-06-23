import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApi } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchApi());
  }

  render() {
    return (
      <>
        <Header />
        <div>TrybeWallet</div>
      </>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
