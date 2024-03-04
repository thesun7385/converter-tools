import PropTypes from "prop-types";

export default function CurrencyInput(props) {
  // validate input value
  const handleAmountChange = (amount) => {
    if (amount >= 0) {
      props.onAmountChange(amount);
    }
  };

  return (
    <div className="currency-control">
      <input
        type="number"
        value={props.amount}
        onChange={(event) => handleAmountChange(event.target.value)}
      />
      <select
        value={props.currency}
        onChange={(event) => props.onCurrencyChange(event.target.value)}
      >
        {props.currencies.map((name, index) => (
          <option key={index} value={name}>
            {name.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

// validate the type of the prop
CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};
