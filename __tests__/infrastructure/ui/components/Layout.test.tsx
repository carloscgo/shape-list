import {
  expect,
  describe,
  it,
  render,
  fireEvent,
  React,
} from '../../../../setupTest'
import Layout from '../../../../src/infrastructure/ui/components/Layout'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from '../../../../src/infrastructure/ui/utils/routes'
import MetaTags from '../../../../src/infrastructure/ui/components/MetaTags'
import Menus from '../../../../src/infrastructure/ui/components/Menu'
import ButtonTheme from '../../../../src/infrastructure/ui/components/ButtonTheme'
import { LanguageSelector } from '../../../../src/infrastructure/ui/components/LanguageSelector'
import Container from '../../../../src/infrastructure/ui/components/Container'

describe('Layout', () => {
  const componentRender = () => (
    <BrowserRouter>
      <HelmetProvider>
        <Layout />
      </HelmetProvider>
    </BrowserRouter>
  )

  const appName = process.env.VITE_APP_TITLE as string

  it('should render without error', () => {
    const { container } = render(componentRender())
    expect(container).toHaveTextContent(appName)
  })

  it('Check if modules are imported correctly', () => {
    expect(MetaTags).toBeDefined()
    expect(Menus).toBeDefined()
    expect(ButtonTheme).toBeDefined()
    expect(LanguageSelector).toBeDefined()
    expect(Container).toBeDefined()
  })

  it('renders logo', () => {
    const { getAllByText } = render(componentRender())
    const logoElement = getAllByText(appName)[0]
    expect(logoElement).toBeInTheDocument()
  })

  it('renders language selector', () => {
    const { getByLabelText } = render(componentRender())
    const languageElement = getByLabelText('language-selector')
    expect(languageElement).toBeInTheDocument()
  })
})
