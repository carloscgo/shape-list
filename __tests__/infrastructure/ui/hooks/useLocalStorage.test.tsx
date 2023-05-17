import { describe, expect, it, renderHook, act } from '../../../../setupTest'
import useLocalStorage, {
  getItemStorage,
  setItemStorage,
} from '../../../../src/infrastructure/ui/hooks/useLocalStorage'

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}

  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = String(value)
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

// Replace the real window.localStorage with the mock version
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useLocalStorage', () => {
  afterEach(() => localStorageMock.clear())

  describe('when key is not in local storage', () => {
    it('returns initial value', () => {
      const initialValue = { name: 'Test Shape' }

      const { result } = renderHook(() =>
        useLocalStorage('shape', initialValue)
      )

      act(() => {
        expect(result.current[0]).toEqual(initialValue)
      })
    })

    it('sets and gets item from local storage', () => {
      const { result } = renderHook(() =>
        useLocalStorage('shape', { name: '' })
      )

      const newShape = { name: 'New Shape' }

      act(() => {
        result.current[1](newShape)
      })

      expect(getItemStorage('shape')).toEqual(newShape)
    })

    it('sets function value in local storage', () => {
      const shape = { name: '' }
      const { result } = renderHook(() => useLocalStorage('shape', shape))

      act(() => {
        result.current[1]((value) => value)
      })

      expect(getItemStorage('shape')).toEqual(shape)
    })
  })

  describe('when key exists in local storage', () => {
    it('returns value from local storage', () => {
      const shape = { name: 'Test Shape' }
      setItemStorage('shape', shape)

      const { result } = renderHook(() =>
        useLocalStorage('shape', { name: '' })
      )

      expect(result.current[0]).toEqual(shape)
    })

    it('updates value in local storage', () => {
      const initialShape = { name: 'Initial Shape' }
      setItemStorage('shape', initialShape)

      const { result } = renderHook(() =>
        useLocalStorage('shape', { name: '' })
      )

      const newShape = { name: 'New Shape' }

      act(() => {
        result.current[1](newShape)
      })

      expect(getItemStorage('shape')).toEqual(newShape)
    })

    it('removes value from local storage', () => {
      const shape = { name: 'Test Shape' }
      setItemStorage('shape', shape)

      const { result } = renderHook(() =>
        useLocalStorage('shape', { name: '' })
      )

      act(() => {
        result.current[1](null)
      })

      expect(getItemStorage('shape')).toBeNull()
    })
  })
})
