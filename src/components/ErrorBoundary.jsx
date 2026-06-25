import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 24px',
          textAlign: 'center',
          background: '#000',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          margin: '24px 0',
        }}>
          <p style={{ color: '#ff375f', fontFamily: 'monospace', fontSize: '0.9rem' }}>
            Something went wrong in this section.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '12px',
              padding: '8px 20px',
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}