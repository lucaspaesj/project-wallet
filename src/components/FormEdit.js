import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/wallet.css';
import { unedit, changeExpense } from '../actions';

const ALIMENTACAO = 'Alimentação';

class FormEdit extends React.Component {
  state = {
    valueInput: 0,
    descriptionInput: '',
    currencieInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: ALIMENTACAO,
  }

  componentDidMount() {
    const { expenses, id } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    this.setState({
      valueInput: expenseToEdit.value,
      descriptionInput: expenseToEdit.description,
      currencieInput: expenseToEdit.currency,
      methodInput: expenseToEdit.method,
      tagInput: expenseToEdit.tag,
    });
  }

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onClickSubmit = async (e) => {
    e.preventDefault();
    const { dispatch, id, expenses } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    const {
      valueInput,
      descriptionInput,
      currencieInput,
      methodInput,
      tagInput,
    } = this.state;
    const stateInputs = {
      id,
      value: valueInput,
      description: descriptionInput,
      currency: currencieInput,
      method: methodInput,
      tag: tagInput,
      exchangeRates: expenseToEdit.exchangeRates,
    };
    dispatch(changeExpense(stateInputs));
    dispatch(unedit());
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
      <form className="addExpense">
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
          onClick={ this.onClickSubmit }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

FormEdit.propTypes = {
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
  id: PropTypes.number.isRequired,
};

FormEdit.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  id: state.wallet.idToEdit,
});

export default connect(mapStateToProps, null)(FormEdit);
