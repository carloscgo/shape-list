import { expect, describe, it, renderHook, act } from '../../../../setupTest'
import { vi } from 'vitest'
import { Shape, TypeShape } from '../../../../src/domain/models/Shape'
import useShapes, {
  partLeftArray,
  partRightArray,
  mapArray,
} from '../../../../src/infrastructure/ui/hooks/useShapes'
import { Positions } from '../../../../src/infrastructure/ui/utils/constants'
import { PositionsT } from '../../../../src/infrastructure/ui/utils/interfaces'

describe('partLeftArray', () => {
  it('should return a new array with the added shape at the correct index', () => {
    const shape = { index: 2 } as Shape
    const leftPart = [{ index: 1 }] as Shape[]
    const type = 'Square' as TypeShape

    const result = partLeftArray({ shape, leftPart, type })

    expect(result).toEqual([{ index: 1 }, { index: 1, type: 'Square' }])
  })

  it('should return a new array with the added shape when index is greater than previous', () => {
    const shape = { index: 1 } as Shape
    const leftPart = [{ index: 1 }] as Shape[]
    const type = 'Square' as TypeShape

    const result = partLeftArray({ shape, leftPart, type })

    expect(result).toEqual([{ index: 1 }, { index: 0, type: 'Square' }])
  })
})

describe('partRightArray', () => {
  it('should return a new array with the added shape at the correct index', () => {
    const shape = { index: 2 } as Shape
    const rightPart = [{ index: 3 }] as Shape[]
    const type = 'Square' as TypeShape

    const result = partRightArray({ shape, rightPart, type })

    expect(result).toEqual([{ index: 3, type: 'Square' }, { index: 3 }])
  })

  it('should return a new array with the added shape when index is smaller than next', () => {
    const shape = { index: 3 } as Shape
    const rightPart = [{ index: 3 }] as Shape[]
    const type = 'Square' as TypeShape

    const result = partRightArray({ shape, rightPart, type })

    expect(result).toEqual([{ index: 4, type: 'Square' }, { index: 3 }])
  })
})

describe('mapArray', () => {
  it('should return a new array with the shapes mapped to new indices', () => {
    const shape = { index: 2, type: 'Circle' } as Shape
    const leftPart = [{ index: 1 }] as Shape[]
    const rightPart = [{ index: 3 }] as Shape[]

    const result = mapArray({ leftPart, shape, rightPart })

    expect(result).toEqual([
      { index: 0 },
      { index: 1, type: 'Circle' },
      { index: 2 },
    ])
  })
})

describe('add', () => {
  it('should correctly add a new shape at the left position', () => {
    const currentIndex = 2
    const position = Positions.left
    const type = 'Circle'
    const shapes = [
      { index: 0, type: 'Square' },
      { index: 1, type: 'Triangle' },
      { index: 2, type: 'Circle' },
    ]
    const setShapes = vi.fn()

    const { result } = renderHook(() => useShapes())

    result.current.add(
      currentIndex,
      position as PositionsT,
      type as TypeShape,
      shapes as Shape[],
      setShapes
    )

    act(() => {
      expect(setShapes).toHaveBeenCalledWith([
        { index: 0, type: 'Square' },
        { index: 1, type: 'Triangle' },
        { index: 2, type: 'Circle' },
        { index: 3, type: 'Circle' },
      ])
    })
  })

  it('should correctly add a new shape at the right position', () => {
    const currentIndex = 2
    const position = Positions.right
    const type = 'Circle'
    const shapes = [
      { index: 0, type: 'Square' },
      { index: 1, type: 'Triangle' },
      { index: 2, type: 'Circle' },
    ]
    const setShapes = vi.fn()

    const { result } = renderHook(() => useShapes())

    result.current.add(
      currentIndex,
      position as PositionsT,
      type as TypeShape,
      shapes as Shape[],
      setShapes
    )

    act(() => {
      expect(setShapes).toHaveBeenCalledWith([
        { index: 0, type: 'Square' },
        { index: 1, type: 'Triangle' },
        { index: 2, type: 'Circle' },
        { index: 3, type: 'Circle' },
      ])
    })
  })

  it('should correctly add a new shape at 0 position', () => {
    const currentIndex = 0
    const position = Positions.right
    const type = 'Circle'
    const shapes = []
    const setShapes = vi.fn()

    const { result } = renderHook(() => useShapes())

    result.current.add(
      currentIndex,
      position as PositionsT,
      type as TypeShape,
      shapes as Shape[],
      setShapes
    )

    act(() => {
      expect(setShapes).toHaveBeenCalledWith([{ index: 0, type: 'Circle' }])
    })
  })
})

describe('remove', () => {
  it('should correctly remove the shape at the specified index', () => {
    const index = 1
    const shapes = [
      { index: 0, type: 'Square' },
      { index: 1, type: 'Triangle' },
      { index: 2, type: 'Circle' },
    ]
    const setShapes = vi.fn()

    const { result } = renderHook(() => useShapes())

    result.current.remove(index, shapes as Shape[], setShapes)

    act(() => {
      expect(setShapes).toHaveBeenCalledWith([
        { index: 0, type: 'Square' },
        { index: 2, type: 'Circle' },
      ])
    })
  })
})
