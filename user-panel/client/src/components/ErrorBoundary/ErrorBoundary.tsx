import React from 'react';
import s from './ErrorBoundary.module.css';
import type { Props, State } from '../../types/errorBoundary';

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error caught in boundary: ', error, errorInfo);
  }

  handleClick = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={s['wrapper-error-message']}>
          <h2>Something went wrong...</h2>
          <details className={s.details}>
            {<summary>Details</summary>}
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
          <a href="/">Home</a>
          <button
            className="button light"
            onClick={this.handleClick}
            data-testid="clear-error"
          >
            Clear error
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
