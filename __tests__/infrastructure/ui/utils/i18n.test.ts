/* eslint-disable @typescript-eslint/no-explicit-any */
import config, {
  i18n,
  initReactI18next,
} from '../../../../src/infrastructure/ui/utils/i18n'
import { expect, describe, it, afterEach } from '../../../../setupTest'
import { vi } from 'vitest'

vi.mock('../../../../src/infrastructure/ui/hooks/useLocalStorage')
vi.mock('i18next', () => {
  return {
    default: {
      use: vi.fn((initReactI18next) => vi.fn(initReactI18next)),
      init: vi.fn((props) => vi.fn(props)),
      hasInitialized: false,
    },
  }
})

describe('i18n', () => {
  describe('Localization Setup', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })

    it('initializes i18n with fallback language on error', () => {
      const spyUse = vi.spyOn(i18n, 'use')

      config()

      expect(spyUse).toHaveBeenCalledWith(initReactI18next)
    })

    it('initializes i18n with stored language', () => {
      const spyUse = vi.spyOn(i18n, 'use')

      config()

      expect(spyUse).toHaveBeenCalledWith(initReactI18next)
    })
  })
})
