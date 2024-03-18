import React, { ReactNode } from 'react';
import ErrorPageComponent from '../components/ErrorPageComponent';

interface MainBoundaryProps {
  children: ReactNode;
}

interface MainBoundaryState {
  hasError: boolean;
}

class MainBoundary extends React.Component<MainBoundaryProps, MainBoundaryState> {
  state: MainBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPageComponent />
    }

    return this.props.children;
  }
}

export default MainBoundary;