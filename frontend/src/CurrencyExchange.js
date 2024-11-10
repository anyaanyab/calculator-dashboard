// Currency Exchange Calculator

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyExchange = ({ savedState, onStateChange }) => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(savedState?.amount || '1');
  const [fromCurrency, setFromCurrency] = useState(savedState?.fromCurrency || 'USD');
  const [toCurrency, setToCurrency] = useState(savedState?.toCurrency || 'EUR');
  const [result, setResult] = useState(savedState?.result || '');
  const [note, setNote] = useState(savedState?.note || '');

  // Hook for fetching currency exchange rates when component mounts
  useEffect(() => {
    // Makes GET request to API endpoint using 'axios'
    const fetchRates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/exchange-rates');
        setRates(response.data.conversion_rates);
        // Logs the error to the console
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };
    fetchRates();
  }, []);

  // Function for currency conversion
  const convert = () => {
    // 'amount' is parsed to a float
    const numAmount = parseFloat(amount);
    // Check if 'rates' object contains selected 'fromCurrency' and 'toCurrency'; amount is valid number
    if (rates && rates[fromCurrency] && rates[toCurrency] && !isNaN(numAmount)) {
      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];
      // Formula for calculation
      const converted = (numAmount * toRate) / fromRate;
      const resultText = `${numAmount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`;
      // Result string constructed and parent component's state updated
      onStateChange({ amount, fromCurrency, toCurrency, result: resultText, note });
      setResult(resultText);
    }
  };

  // Component returns JSX structure
  // Includes input field, dropdown for selecting currency to convert from and selecting currency to convert to
  // 'onChange' handlers update state variables and call 'onStateChange'
  return (
    <div className="currency-exchange">
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          onStateChange({ amount: e.target.value, fromCurrency, toCurrency, note }); 
        }}
        className="currency-exchange-input"
      />
      <select 
        value={fromCurrency} 
        onChange={(e) => {
          setFromCurrency(e.target.value);
          onStateChange({ amount, fromCurrency: e.target.value, toCurrency, note }); 
        }}
      >
        {Object.keys(rates).map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <select 
        value={toCurrency} 
        onChange={(e) => {
          setToCurrency(e.target.value);
          onStateChange({ amount, fromCurrency, toCurrency: e.target.value, note });
        }}
      >
        {Object.keys(rates).map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <button onClick={convert}>Convert</button>
      <div className="result" data-testid="result">{result}</div>
      <textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          onStateChange({ amount, fromCurrency, toCurrency, result, note: e.target.value });
        }}
        placeholder="Add a note..."
      />
    </div>
  );
};

export default CurrencyExchange;