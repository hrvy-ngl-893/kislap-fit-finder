import { render, screen } from '@testing-library/react';

jest.mock('react-lottie', () => ({
  __esModule: true,
  default: () => <div data-testid="lottie-mock" />,
}));

import App from './App';

test('Test', () => {
  render(<App />);

  expect(screen.getByText(/Kislab the Label/i)).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(17);
});
