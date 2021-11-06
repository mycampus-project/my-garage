import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders side menu', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.findByTestId('NavigationMenu')).toBeDefined();
  });
});
