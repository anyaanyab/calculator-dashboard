// Time Zone Calculator

import React, { useState } from 'react';

const TimeZoneCalculator = ({ savedState, onStateChange }) => {
  const [time, setTime] = useState(savedState?.time || '');
  const [fromZone, setFromZone] = useState(savedState?.fromZone || 'UTC');
  const [toZone, setToZone] = useState(savedState?.toZone || 'UTC');
  const [result, setResult] = useState(savedState?.result || '');
  const [note, setNote] = useState(savedState?.note || '');
  
  // Array of timezone strings used for conversion
  const timeZones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Dubai',
    'Australia/Sydney',
    'Pacific/Auckland'
  ];

  // Handles conversion of input time from 'fromZone' to 'toZone'
  const convertTime = () => {
    // Check if time provided
    if (!time) return;
    
    // New 'Date' object created, input time split, set on 'inputDate'
    try {
      const inputDate = new Date();
      const [hours, minutes] = time.split(':');
      inputDate.setHours(parseInt(hours));
      inputDate.setMinutes(parseInt(minutes));
      
      // Convert 'inputDate' to target timezone
      const convertedTime = inputDate.toLocaleTimeString('en-US', {
        timeZone: toZone,
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // Result formatted as string and states are ipdated
      const resultText = `${time} in ${fromZone} is ${convertedTime} in ${toZone}`;
      onStateChange({ time, fromZone, toZone, result: resultText, note });
      setResult(resultText);
      // Logs error and sets failure message in case of error
    } catch (error) {
      console.log('Conversion error:', error);
      setResult('Unable to convert time');
    }
  };  

  // Users can enter time, select fromZone and toZone, click convert button and receive result
  // It is also possible to write notes under the calculator
  return (
    <div className="timezone-calculator">
      <label htmlFor="time-input">Time:</label>
      <input
      id="time-input"
        type="time"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          onStateChange({ time: e.target.value, fromZone, toZone, result, note });
        }}        
      />
      <select 
        value={fromZone} 
        onChange={(e) => {
          setFromZone(e.target.value);
          onStateChange({ time, fromZone: e.target.value, toZone, result, note });
        }}
      >
        {timeZones.map(zone => (
          <option key={zone} value={zone}>{zone}</option>
        ))}
      </select>
      <select 
        value={toZone} 
        onChange={(e) => {
          setToZone(e.target.value);
          onStateChange({ time, fromZone, toZone: e.target.value, result, note });
        }}
      >
        {timeZones.map(zone => (
          <option key={zone} value={zone}>{zone}</option>
        ))}
      </select>
      <button onClick={convertTime}>Convert Time</button>
      <div className="result" data-testid="timezone-result">{result}</div>
      <textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          onStateChange({ time, fromZone, toZone, result, note: e.target.value });
        }}
        placeholder="Add a note..."
      />
    </div>
  );
};

export default TimeZoneCalculator;