import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApi, fetchApiExchange } from '../actions';

const ALIMENTACAO = 'Alimentação';

class Wallet extends React.Component {
  state = {
    valueInput: 0,
    descriptionInput: '',
    currencieInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: ALIMENTACAO,
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

  onClickSubmit = async (e) => {
    const { dispatch } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencieInput,
      methodInput,
      tagInput,
    } = this.state;
    e.preventDefault();
    const stateInputs = {
      value: valueInput,
      description: descriptionInput,
      currency: currencieInput,
      method: methodInput,
      tag: tagInput,
    };
    await dispatch(fetchApiExchange(stateInputs));
    this.setState({
      valueInput: 0,
      descriptionInput: '',
      currencieInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: ALIMENTACAO,
    });
  }

  render() {
    const { currencies, expenses } = this.props;
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
        <form
          className="addExpense"
          onSubmit={ this.onClickSubmit }
        >
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
              <option>{ ALIMENTACAO }</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
        <form>
          <table>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
            {
              expenses[0] && expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    {
                      Number(
                        expense.exchangeRates[expense.currency].ask,
                      ).toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      Math.trunc(Number((expense.value
                        * expense.exchangeRates[expense.currency].ask * 100))) / 100
                    }
                  </td>
                  <td>Real</td>
                  <td>Editar/Excluir</td>
                </tr>
              ))
            }
          </table>
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
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.objectOf(
          PropTypes.string,
        ),
      ),
    }),
  ),
};

Wallet.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Wallet);
