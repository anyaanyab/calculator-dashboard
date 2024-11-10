// Dashboard

import React, {useCallback} from 'react';
import BasicCalculator from './BasicCalculator';
import CurrencyExchange from './CurrencyExchange';
import ScientificCalculator from './ScientificCalculator';
import TimeZoneCalculator from './TimeZoneCalculator';
import PercentageCalculator from './PercentageCalculator';
import RandomNumberCalculator from './RandomNumber';

const Dashboard = ({ calculators, setCalculators }) => {
  // Defined using 'useCallback' to update state of specific calculator based on its 'id'
  const handleStateChange = useCallback((id, newState) => {
    setCalculators(prevCalculators =>
      prevCalculators.map(calc =>
        calc.id === id ? { ...calc, state: newState } : calc
      )
    );
  }, [setCalculators]);

  // Removes calculator from 'calculators' array based on its 'id'
  const removeCalculator = (id) => {
    setCalculators(prevCalculators => 
      // New array created that excludes the specified calculator
      prevCalculators.filter(calc => calc.id !== id)
    );
  };

  // Calculator object is taken as argument, corresponding calculator component returned based on 'type'
  const renderCalculator = (calculator) => {
    const props = {
      id: calculator.id,
      savedState: calculator.state, // Pass saved state
      onStateChange: (state) => handleStateChange(calculator.id, state)
      }

    switch (calculator.type) {
      case 'Basic Calculator':
        return <BasicCalculator {...props} />;
      case 'Currency Exchange':
        return <CurrencyExchange {...props} />;
      case 'Scientific Calculator':
        return <ScientificCalculator {...props} />;
      case 'Time Zone Calculator':
        return <TimeZoneCalculator {...props} />;
      case 'Percentage Calculator':
        return <PercentageCalculator {...props} />;
      case 'Random Number Generator':
        return <RandomNumberCalculator {...props} />;
      default:
        return null;
    }
  };

  // Returns JSX structure that represents the dashboard
  // Maps over 'calculators' to render each calculator widget
  return (
    <div className="dashboard" data-testid="dashboard">
      {calculators.map(calc => (
        <div key={calc.id} className="calculator-widget">
          <div className="widget-header">
            <h3>{calc.type}</h3>
            <button onClick={() => removeCalculator(calc.id)}>×</button>
          </div>
          {renderCalculator(calc)}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;