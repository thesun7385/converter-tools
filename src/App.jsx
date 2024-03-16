import Header from "./components/Header";
import CurrencyConverter from "./components/CurrencyConverter";
import CryptoConverter from "./components/CryptoConverter";
import exchangeLogo from "./assets/exchange.png";
import cryptoLogo from "./assets/crypto-exchange.png";

function App() {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <a href="#currency-page">Currency Converter</a>
          </li>
          <li>
            <a href="#crypto-page">Crypto Converter</a>
          </li>
        </ul>
      </nav>
      <section id="currency-page" className="page-1">
        <Header content="currency converter" logoImg={exchangeLogo} />
        <CurrencyConverter />
      </section>
      <section id="crypto-page" className="page-2">
        <Header content="Crypto Converter" logoImg={cryptoLogo} />
        <CryptoConverter />
      </section>
      <footer>
        <p>Copyright ©2024 by Supachai Ruknuy</p>{" "}
      </footer>
    </>
  );
}

export default App;
