import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can log the error to an error reporting service
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || <p>Something went wrong</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
