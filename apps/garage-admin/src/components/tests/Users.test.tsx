import { render, screen, waitFor } from '@testing-library/react';
import Users from './Users';

window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener() {},
    removeListener() {},
  }));

test('on initial render the screen shows a user list', async () => {
  render(<Users />);

  await waitFor(() => {
    expect(screen.getByTestId('UserList')).toBeDefined();
  });
});

test('on initial render the screen loads banner', async () => {
  render(<Users />);
  expect(screen.getByTestId('banner')).toBeDefined();
});
