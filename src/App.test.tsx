import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./App.css', () => '');
jest.mock('./sample.scss', () => '');

test('loads and displays greeting', async () => {
  // ARRANGE
  const app = render(<App tab="tab_content" />);

  // show content
  app.debug();

  // ACT
  await userEvent.click(screen.getByText('sample'));
  await screen.findByRole('heading');

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent(
    'React application!!! tab_content',
  );
  expect(screen.getByRole('button')).toBeEnabled();
});
