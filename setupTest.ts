/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { configure } from '@testing-library/react'
import i18n from './src/infrastructure/ui/utils/i18n'

import matchers from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

expect.extend(matchers)

configure({ testIdAttribute: 'data-test' })
i18n()

vi.mock('react-indexed-db', () => ({
  useIndexedDB: vi.fn(),
  initDB: vi.fn(),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...(actual as any),

    useHistory: vi.fn(),
    useParams: vi.fn(),
    useRoutes: vi.fn(),
    useLocation: () => ({
      search: '',
      pathname: '/',
    }),
    matchPath: vi.fn(),
    withRouter: vi.fn(),
    useRouteMatch: vi.fn(),
    Link: ({ children, to }: { children: JSX.Element; to: string }) =>
      React.createElement('a', { href: to }, children),
    Switch: () => vi.fn(),
  }
})

export * from '@testing-library/react'
export * from 'vitest'
export { React, userEvent, vi }
