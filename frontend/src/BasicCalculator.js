// Basic Calculator

import React, { useState, useCallback, useRef } from 'react';

const BasicCalculator = ({ savedState, onStateChange }) => {
  const [display, setDisplay] = useState(savedState?.display || '0');
  const [equation, setEquation] = useState(savedState?.equation || '');
  const [note, setNote] = useState(savedState?.note || '');
  // Reference to note input field
  const noteRef = useRef(null);

  // Update 'note' state when user types in note input field
  const handleNoteChange = useCallback((e) => {
    const newNote = e.target.value;
    setNote(newNote);
    onStateChange({
      display,
      equation,
      note: newNote
    });
    // 'onStateChange' called to notify parent component of state change
  }, [display, equation, onStateChange]);

  // Update 'display' state with number pressed by user
  const handleNumber = (number) => {
    // If display is 0, it replaces it; otherwise - appends number
    const newDisplay = display === '0' ? String(number) : display + number;
    setDisplay(newDisplay);
    onStateChange({ display: newDisplay, equation, note }); // Update state
  };

  // Appends operator to 'equation' and resets 'display' to 0
  const handleOperator = (operator) => {
    const newEquation = display + operator;
    setEquation(newEquation);
    setDisplay('0');
    onStateChange({ display: '0', equation: newEquation, note }); // Update state
  };

  // Evaluates equation when user presses 'equals' button
  const calculate = () => {
    try {
      // Full equation constructed from current 'display' and 'equation'
      const fullEquation = equation + display;
      // Result calculated and 'display' is updated with result
      const result = calculateExpression(fullEquation);
      setDisplay(String(result));
      setEquation('');
      onStateChange({ display: String(result), equation: '', note });
      // In case of error sets display to 'Error'
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      onStateChange({ display: 'Error', equation: '', note });
    }
  };
  
  // Computes result of arithmetic expression
  const calculateExpression = (expr) => {
    // Input sanitized to remove any characters not part of valid expression
    const sanitizedExpr = expr.replace(/[^-()\d/*+.]/g, '');
    // Sanitized expression tokenized into numbers and operators
    const tokens = sanitizedExpr.match(/([0-9.]+|[/*+-])/g) || [];
    
    let result = parseFloat(tokens[0] || 0);
    
    // Iteration over tokens
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseFloat(tokens[i + 1]);
      
      // Corresponding arithmetic operation applied based on operator encountered
      switch (operator) {
        case '+': result += operand; break;
        case '-': result -= operand; break;
        case '*': result *= operand; break;
        case '/': result /= operand; break;
        default: throw new Error('Invalid operator');
      }
    }
    
    // Result returned at end of function
    return result;
  };  

  // Calculator's display and equation reset to intiial states
  const clear = () => {
    setDisplay('0');
    setEquation('');
    onStateChange({ display: '0', equation: '', note });
  };

  // Calculator's interface: display area, set of buttons for numbers, operations, result and clear input
  // 'textarea' included to add notes 
  return (
    <div className="basic-calculator">
      <div className="calculator-display" data-testid="calculator-display">{display}</div>
      <div className="calculator-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
          <button key={num} onClick={() => handleNumber(num)}>{num}</button>
        ))}
        <button onClick={() => handleOperator('+')}>+</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleOperator('*')}>×</button>
        <button onClick={() => handleOperator('/')}>÷</button>
        <button onClick={calculate}>=</button>
        <button onClick={clear}>C</button>
      </div>
      <textarea
        ref={noteRef}
        value={note}
        onChange={handleNoteChange}
        placeholder="Add a note..."
        className="calculator-notes"
      />
    </div>
  );
};

export default BasicCalculator;