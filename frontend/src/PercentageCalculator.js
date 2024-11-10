// Percentage Calculator

import React, { useState } from 'react';

const PercentageCalculator = ({ savedState, onStateChange }) => {
  const [amount, setAmount] = useState(savedState?.amount || '0');
  const [percentage, setPercentage] = useState(savedState?.percentage || '0');
  const [result, setResult] = useState(savedState?.result || '');
  const [note, setNote] = useState(savedState?.note || '');

  // Called when user clicks 'Calculate' button
  const calculatePercentage = () => {
    // 'amount' and 'percentage' states converted from strings to floats
    const numAmount = parseFloat(amount);
    const numPercentage = parseFloat(percentage);
    
    // Check if both values are valid numbers
    if (!isNaN(numAmount) && !isNaN(numPercentage)) {
      // If valid, percentage calculated, result string constructed
      const calculatedResult = (numAmount * numPercentage) / 100;
      const resultText = `${numPercentage}% of ${numAmount} is ${calculatedResult.toFixed(2)}`;
      // Parent component updated with new values, 'result' state updated
      onStateChange({ amount, percentage, result: resultText, note });
      setResult(resultText);
    }
  };
  
  // JSX structure returned
  // Input fields for 'amount' and 'percentage', button for calculating, result and notes field included
  return (
    <div className="percentage-calculator">
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          onStateChange({ amount: e.target.value, percentage, note }); 
        }}
        placeholder="Amount"
      />
      <input
        type="number"
        value={percentage}
        onChange={(e) => {
          setPercentage(e.target.value);
          onStateChange({ amount, percentage: e.target.value, note });
        }}
        placeholder="Percentage"
      />
      <button onClick={calculatePercentage}>Calculate</button>
      <div className="result">{result}</div>
      <textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          onStateChange({ amount, percentage, result, note: e.target.value });
        }}
        placeholder="Add a note..."
      />
    </div>
  );
};

export default PercentageCalculator;