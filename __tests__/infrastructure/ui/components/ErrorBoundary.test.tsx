import { expect, describe, it, render, React } from '../../../../setupTest'
import ErrorBoundary from '../../../../src/infrastructure/ui/components/ErrorBoundary'

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    const ChildComponent = <div>Child Component</div>
    const { container } = render(
      <ErrorBoundary>{ChildComponent}</ErrorBoundary>
    )

    expect(container).toHaveTextContent('Child Component')
  })

  it('should render the fallback UI when an error is thrown', () => {
    const FallbackUI = <h2>Something went wrong!</h2>
    const { container } = render(
      <ErrorBoundary hasError={true}>{FallbackUI}</ErrorBoundary>
    )

    //container.setState({ hasError: true })

    expect(container).toHaveTextContent('Oops, there is an error!')
  })
})
