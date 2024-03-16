// type "rfc" keyword for creating a functional component
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CurrencyInput from "./CurrencyInput";
import axios from "axios";
import "./CurrencyConverter.css";

export default function CurrencyConverter() {
  // Initialize the state
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState("cad");
  const [currency2, setCurrency2] = useState("thb");
  const [rates, setRates] = useState([]);

  // Calling currency API for currency name
  useEffect(() => {
    axios
      .get(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
      )
      .then((res) => {
        // store the eruo data in a variable
        const eurData = res.data.eur;

        // check obejct in the console
        // console.log(eurData);

        // set the rates
        setRates(eurData);
      })
      .catch((error) => {
        console.error("Error fetching EUR data:", error);
      });
  }, []);

  // Calculate the amount at beginning
  useEffect(() => {
    if (rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

  // Handle the amount change
  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  // Handle the currency change
  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  // Handle the amount change
  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  // Handle the currency change
  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  function format(num) {
    return num.toFixed(3);
  }

  return (
    <>
      <div className="currency-group">
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(rates)}
          amount={amount1}
          currency={currency1}
        />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={amount2}
          currency={currency2}
        />
        <p>
          {amount1} {currency1} = {amount2} {currency2}
        </p>
      </div>
    </>
  );
}

// validate the type of the prop
CurrencyInput.propTypes = {
  amount1: PropTypes.number,
  amount2: PropTypes.number,
};
