import PropTypes from "prop-types";

export default function CryptoInput(props) {
  // validate input value
  const handleAmountChange = (amount) => {
    if (amount >= 0) {
      props.onAmountCryptoChange(amount);
    }
  };

  return (
    <div className="crypto-control">
      <input
        type="number"
        value={props.amount}
        onChange={(event) => handleAmountChange(event.target.value)}
      />
      <select
        value={props.crypto}
        onChange={(event) => props.onCryptoChange(event.target.value)}
      >
        {props.cryptoCurrencies.map((crypto, index) => (
          <option key={index} value={crypto}>
            {crypto.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

// validate the type of the prop
CryptoInput.propTypes = {
  amount: PropTypes.number.isRequired,
  crypto: PropTypes.string.isRequired,
  cryptoCurrencies: PropTypes.array,
  onAmountCryptoChange: PropTypes.func,
  onCryptoChange: PropTypes.func,
};
