import {
  React,
  render,
  cleanup,
  screen,
  expect,
  describe,
  it,
} from '../setupTest'
import App from '../src/App'

const appName = process.env.VITE_APP_TITLE as string

describe('App', () => {
  afterEach(() => cleanup())

  it('renders', () => {
    render(<App />)

    const alertText = screen.getAllByText(appName)[0]

    expect(alertText).toBeInTheDocument()
  })
})
