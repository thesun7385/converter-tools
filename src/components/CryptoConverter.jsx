// type "rfc" keyword for creating a functional component
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CryptoInput from "./CryptoInput";
import axios from "axios";
import "./CryptoConverter.css";

export default function CryptoConverter() {
  // Initialize the state
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [crypto1, setCrypto1] = useState("btc");
  const [crypto2, setCrypto2] = useState("usd");
  const [rates, setRates] = useState([]);

  // Calling crypto API for crypto name
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/exchange_rates")
      .then((res) => {
        //Store crypto data in a variable
        const cryptoData = res.data.rates;

        // Convert obj to array of key-value pairs
        const formattedRates = Object.entries(cryptoData).reduce(
          (acc, [key, value]) => {
            acc[key] = value.value;
            return acc;
          },
          {}
        );
        // console.log(formattedRates);

        // Set the rates, so rate = cryptoObj now
        setRates(formattedRates);
      })
      .catch((error) => {
        console.error("Error fetching crypto data:", error);
      });
  }, []);

  // Calculate the amount at beginning
  useEffect(() => {
    if (rates) {
      handleAmount1CryptChange(1);
    }
  }, [rates]);

  // Function to calculate and handle the amount change
  function handleAmount1CryptChange(amount1) {
    setAmount2(format((amount1 * rates[crypto2]) / rates[crypto1]));
    setAmount1(amount1);
  }

  // Function to handle the currency change
  function handleCrypt1Change(crypto1) {
    setAmount2(format((amount1 * rates[crypto2]) / rates[crypto1]));
    setCrypto1(crypto1);
  }

  // Handle the amount change
  function handleAmount2CryptChange(amount2) {
    setAmount1(format((amount2 * rates[crypto1]) / rates[crypto2]));
    setAmount2(amount2);
  }

  // Handle the currency change
  function handleCrypt2Change(crypto2) {
    setAmount1(format((amount2 * rates[crypto1]) / rates[crypto2]));
    setCrypto2(crypto2);
  }

  // Format the number
  function format(num) {
    return num.toFixed(3);
  }

  return (
    <>
      <div className="crypto-group">
        <CryptoInput
          onAmountCryptoChange={handleAmount1CryptChange}
          onCryptoChange={handleCrypt1Change}
          cryptoCurrencies={Object.keys(rates)}
          amount={amount1}
          crypto={crypto1}
        />
        <CryptoInput
          onAmountCryptoChange={handleAmount2CryptChange}
          onCryptoChange={handleCrypt2Change}
          cryptoCurrencies={Object.keys(rates)}
          amount={amount2}
          crypto={crypto2}
        />
      </div>
      <p>
        {amount1} {crypto1} = {amount2} {crypto2}
      </p>
    </>
  );
}

// validate the type of the prop
CryptoInput.propTypes = {
  amount1: PropTypes.number,
  amount2: PropTypes.number,
};
