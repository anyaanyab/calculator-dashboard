// Scientific Calculator

import React, { useState } from 'react';

const ScientificCalculator = ({ savedState, onStateChange }) => {
  const [display, setDisplay] = useState(savedState?.display || '0');
  const [note, setNote] = useState(savedState?.note || '');

  // Called when number button clicked
  const handleNumber = (number) => {
    // Updates display: if display is 0, replced with clicked number
    // Otherwise appends clicked number to current display
    const newDisplay = display === '0' ? String(number) : display + number;
    setDisplay(newDisplay);
    // Parent component notified of updated state
    onStateChange({ display: newDisplay, note });
  };

  // Handles mathematical functions
  const handleFunction = (func) => {
    const num = parseFloat(display);
    // Converts current display value to floar and performs operation
    let newDisplay = display;
    // Results converted back to string
    switch (func) {
      case 'sin':
        newDisplay = Math.sin(num).toString();
        break;
      case 'cos':
        newDisplay = Math.cos(num).toString();
        break;
      case 'tan':
        newDisplay = Math.tan(num).toString();
        break;
      case 'sqrt':
        newDisplay = Math.sqrt(num).toString();
        break;
      case 'pow2':
        newDisplay = Math.pow(num, 2).toString();
        break;
      default:
        break;
    }
    // Result set as new display value
    setDisplay(newDisplay);
    onStateChange({ display: newDisplay, note });
  };

  // Resets display to 0 and updates parent component's state
  const clear = () => {
    setDisplay('0');
    onStateChange({ display: '0', note });
  };

  // JSX structure returned, represents calculator UI
  // Display with current value, set of buttons for numbers and functions, and notes field included 
  return (
    <div className="scientific-calculator">
      <div className="calculator-display" data-testid="calculator-display">{display}</div>
      <div className="calculator-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
          <button key={num} onClick={() => handleNumber(num)}>{num}</button>
        ))}
        <button onClick={() => handleFunction('sin')}>sin</button>
        <button onClick={() => handleFunction('cos')}>cos</button>
        <button onClick={() => handleFunction('tan')}>tan</button>
        <button onClick={() => handleFunction('sqrt')}>√</button>
        <button onClick={() => handleFunction('pow2')}>x²</button>
        <button onClick={clear}>C</button>
      </div>
      <textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          onStateChange({ display, note: e.target.value }); // Update state
        }}
        placeholder="Add a note..."
      />
    </div>
  );
};

export default ScientificCalculator;