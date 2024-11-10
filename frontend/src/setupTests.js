import '@testing-library/jest-dom';

// Mock for 'localStorage' API set up when using Jest as testing framework
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });