import { BrokenComponent } from '../../test-utils/mocks/data';
import ErrorBoundary from './ErrorBoundary';
import { render, screen } from '@testing-library/react';

describe('Error Catching Tests', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    consoleError.mockClear();
  });

  afterAll(() => {
    consoleError.mockRestore();
  });

  it('Catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByTestId('clear-error')).toBeInTheDocument();
  });
});
