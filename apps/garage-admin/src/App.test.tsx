import { render, screen, waitFor, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('renders side menu', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.findByTestId('NavigationMenu')).toBeDefined();
  });
});
