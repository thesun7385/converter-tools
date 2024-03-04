import Header from "./components/Header";
import CurrencyCoverter from "./components/CurrencyCoverter";
import exchangeLogo from "./assets/exchange.png";

function App() {
  return (
    <>
      <Header content="currency converter" logoImg={exchangeLogo} />
      <CurrencyCoverter />
    </>
  );
}

export default App;
