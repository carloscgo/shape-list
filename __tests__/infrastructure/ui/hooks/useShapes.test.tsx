import { expect, describe, it, render, React } from '../../../../setupTest'
import { Shape, TypeShape } from '../../../../src/domain/models/Shape'

import {
  partLeftArray,
  partRightArray,
  mapArray,
} from '../../../../src/infrastructure/ui/hooks/useShapes'

describe('partLeftArray', () => {
  it('should return a new array with the added shape at the correct index', () => {
    const shape = { index: 2 } as Shape
    const leftPart = [{ index: 1 }] as Shape[]
    const type = 'Square' as TypeShape

    const result = partLeftArray({ shape, leftPart, type })

    expect(result).toEqual([{ index: 1 }, { index: 1, type: 'Square' }])
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
