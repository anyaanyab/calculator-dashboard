// Random Number Calculator

import React, { useState } from 'react';

const RandomNumberCalculator = ({ savedState, onStateChange }) => {
  const [min, setMin] = useState(savedState?.min || '0');
  const [max, setMax] = useState(savedState?.max || '100');
  const [randomNumber, setRandomNumber] = useState(savedState?.randomNumber || '');
  const [note, setNote] = useState(savedState?.note || '');

  // Generates random number between 'min' and 'max' when called
  const generateRandomNumber = () => {
    // 'min' and 'max' are converted to integers
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    
    // Check for validity and that 'min' is less than 'max'
    // If valid, generates random number and updates state
    if (!isNaN(minNum) && !isNaN(maxNum) && minNum < maxNum) {
      const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      onStateChange({ min, max, randomNumber: random.toString(), note });
      setRandomNumber(random);
    }
  };  

  // JSX structure returned
  // Labels, input fields, button for generation, result and notes field included
  return (
    <div className="random-number-calculator">
      <label htmlFor="min-input">Min:</label>
      <input
      id="min-input"
        type="number"
        value={min}
        onChange={(e) => {
          setMin(e.target.value);
          onStateChange({ min: e.target.value, max, note });
        }}
        placeholder="Min"
      />

      <label htmlFor="max-input">Max:</label>
      <input
        id="max-input"
        type="number"
        value={max}
        onChange={(e) => {
          setMax(e.target.value);
          onStateChange({ min, max: e.target.value, note });
        }}
        placeholder="Max"
      />

      <button data-testid="generate-button" onClick={generateRandomNumber}>Generate Random Number</button>
 <div className="result">{randomNumber}</div>
      <textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          onStateChange({ min, max, randomNumber, note: e.target.value });
        }}
        placeholder="Add a note..."
      />
    </div>
  );
};

export default RandomNumberCalculator;