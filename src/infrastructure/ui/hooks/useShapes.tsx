import { find, reduceRight, reduce, remove, clone } from 'lodash'
import { IdShape, TypeShape, Shape } from '../../../domain/models/Shape'
import { Positions } from '../utils/constants'
import { PositionsT } from '../utils/interfaces'

export const partLeftArray = ({
  shape,
  leftPart,
  type,
}: {
  shape: Shape
  leftPart: Shape[]
  type: TypeShape
}) => {
  const newIndex = (shape.index as number) - 1

  reduceRight(
    leftPart,
    (previousValue: Shape, currentValue: Shape) => {
      const currentIndex = currentValue.index as number
      const previousIndex = previousValue.index as number

      if (currentIndex < previousIndex) {
        return {
          ...currentValue,
          index: (currentIndex - 1) as IdShape,
        }
      }

      return currentValue
    },
    {
      index: shape.index as number,
    } as Shape
  )

  return [...leftPart, { index: newIndex, type }]
}

export const partRightArray = ({
  shape,
  rightPart,
  type,
}: {
  shape: Shape
  rightPart: Shape[]
  type: TypeShape
}) => {
  const newIndex = (shape.index as number) + 1

  reduce(
    rightPart,
    (previousValue: Shape, currentValue: Shape) => {
      const currentIndex = currentValue.index as number
      const previousIndex = previousValue.index as number

      if (currentIndex > previousIndex) {
        return {
          ...currentValue,
          index: currentIndex + 1,
        }
      }
      return currentValue
    },
    {
      index: shape.index as number,
    } as Shape
  )

  return [{ index: newIndex, type }, ...rightPart]
}

export const mapArray = ({
  leftPart,
  shape,
  rightPart,
}: {
  leftPart: Shape[]
  shape: Shape
  rightPart: Shape[]
}) => {
  return [...leftPart, shape, ...rightPart].map((shape, index) => ({
    ...shape,
    index,
  }))
}

const useShapes = () => {
  return {
    add: (
      currentIndex: IdShape,
      position: PositionsT,
      type: TypeShape,
      shapes: Shape[],
      setShapes: (shapes: Shape[]) => void
    ) => {
      const shape = find(shapes, { index: currentIndex })

      let newShapes = []

      if (shape) {
        let leftPart = shapes.filter(({ index }) => index < currentIndex) ?? []
        let rightPart = shapes.filter(({ index }) => index > currentIndex) ?? []

        if (position === Positions.left) {
          leftPart = partLeftArray({ shape, leftPart, type })
        } else if (position === Positions.right) {
          rightPart = partRightArray({ shape, rightPart, type })
        }

        newShapes = mapArray({ leftPart, shape, rightPart })
      } else {
        newShapes = [{ index: 0, type }]
      }

      setShapes(newShapes)
    },

    remove: (
      index: IdShape,
      shapes: Shape[],
      setShapes: (shapes: Shape[]) => void
    ) => {
      const cloneShapes = clone(shapes)

      remove(cloneShapes, (shape) => shape.index === index).map(
        (shape, index) => ({
          ...shape,
          index,
        })
      )

      setShapes(cloneShapes)
    },
  }
}

export default useShapes
