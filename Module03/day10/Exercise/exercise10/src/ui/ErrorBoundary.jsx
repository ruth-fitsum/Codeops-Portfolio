import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="message">
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or return to the menu.</p>
          <a href="/menu" className="button">
            Return to menu
          </a>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;