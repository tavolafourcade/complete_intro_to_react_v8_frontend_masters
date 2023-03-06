import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // Lifecycle method that is called when an error is thrown
  componentDidCatch(error, info) {
    // Log this to Sentry, Azure Monitor, New Relic, TrackJS
    console.error('ErrorBoundary caught an error', error, info)
  }

  render(){
    if (this.state.hasError) {
      return this.props.errorComponent
    }

    return this.props.children
  }

}

export default ErrorBoundary