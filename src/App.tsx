import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './infrastructure/ui/components/ErrorBoundary'
import Layout from './infrastructure/ui/components/Layout'
import { BrowserRouter } from './infrastructure/ui/utils/routes'
import i18n from './infrastructure/ui/utils/i18n'

import 'notyf/notyf.min.css'
import 'flag-icons/css/flag-icons.min.css'
import './index.css'

i18n()

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <HelmetProvider>
          <Layout data-testid="layout-component" />
        </HelmetProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
