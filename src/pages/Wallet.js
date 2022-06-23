import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApi } from '../actions';

class Wallet extends React.Component {
  state = {
    valueInput: '',
    descriptionInput: '',
    currencieInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchApi());
  }

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencieInput,
      methodInput,
      tagInput,
    } = this.state;
    return (
      <>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              data-testid="value-input"
              id="value-input"
              name="valueInput"
              value={ valueInput }
              onChange={ this.onChangeInput }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
              name="descriptionInput"
              value={ descriptionInput }
              onChange={ this.onChangeInput }
            />
          </label>
          <label htmlFor="currencie-input">
            Moeda:
            <select
              id="currencie-input"
              name="currencieInput"
              value={ currencieInput }
              onChange={ this.onChangeInput }
            >
              {
                currencies.map((currencie) => (
                  <option key={ currencie }>{ currencie }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            Forma de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              name="methodInput"
              value={ methodInput }
              onChange={ this.onChangeInput }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              id="tag-input"
              name="tagInput"
              data-testid="tag-input"
              value={ tagInput }
              onChange={ this.onChangeInput }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(Wallet);
