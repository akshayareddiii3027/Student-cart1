import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders StudentCart header', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const logoElements = screen.getAllByText(/StudentCart/i);
  expect(logoElements.length).toBeGreaterThan(0);
});
