import './App.scss';
import { Input } from './Components/Input/Input';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './Components/Header/Header';

function App() {
  const [amount1, setAmount1] = useState('1');
  const [amount2, setAmount2] = useState('1');
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('UAH');
  const [rates, setRates] = useState([]);
  const [theme, setTheme] = useState(false);

  const onChangeTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    axios.get('https://api.exchangerate.host/latest').then((response) => {
      response.data.rates = Object.keys(response.data.rates)
        .filter(
          (key) =>
            key.includes('UAH') ||
            key.includes('USD') ||
            key.includes('EUR') ||
            key.includes('PLN'),
        )
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: response.data.rates[key],
          });
        }, {});
      setRates(response.data.rates);
    });
  }, []);

  useEffect(() => {
    if (rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

  function fixed(num) {
    return num.toFixed(2);
  }

  function handleAmount1Change(amount1) {
    setAmount2(fixed((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(fixed((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(fixed((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(fixed((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  const usd = () => {
    return fixed(rates['UAH'] / rates['USD']);
  };

  const eur = () => {
    return fixed(rates['UAH'] / rates['EUR']);
  };

  return (
    <div className={theme ? 'dark' : 'light'}>
      <Header usd={usd()} eur={eur()} onChangeTheme={onChangeTheme} />
      <Input
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <Input
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  );
}

export default App;
