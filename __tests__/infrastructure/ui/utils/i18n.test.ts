/* eslint-disable @typescript-eslint/no-explicit-any */
import config, {
  languages,
  key,
  fallbackLanguage,
  i18n,
  initReactI18next,
} from '../../../../src/infrastructure/ui/utils/i18n'
import { getItemStorage } from '../../../../src/infrastructure/ui/hooks/useLocalStorage'
import {
  expect,
  describe,
  it,
  afterEach,
  beforeEach,
} from '../../../../setupTest'
import { vi } from 'vitest'

vi.mock('../../../../src/infrastructure/ui/hooks/useLocalStorage')
vi.mock('i18next')

describe('i18n', () => {
  describe('Localization Setup', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })

    beforeEach(() => {
      i18n.hasInitialized = false
    })

    it('initializes i18n with fallback language on error', () => {
      getItemStorage.mockReturnValueOnce(fallbackLanguage)

      i18n.use.mockReturnValueOnce({ init: (v: any) => v })

      config()

      expect(getItemStorage).toHaveBeenCalledWith(key, fallbackLanguage)
      expect(i18n.use).toHaveBeenCalledWith(initReactI18next)
    })

    it('initializes i18n with stored language', () => {
      const storedLanguage = languages[1]

      getItemStorage.mockReturnValueOnce(storedLanguage)

      i18n.use.mockReturnValueOnce({ init: (v: any) => v })

      config()

      expect(getItemStorage).toHaveBeenCalledWith(key, fallbackLanguage)
      expect(i18n.use).toHaveBeenCalledWith(initReactI18next)
    })
  })
})
