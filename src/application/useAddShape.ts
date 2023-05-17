// application/useAddShape.ts

import { useIndexDB } from '.'
import { Shape } from '../domain/models/Shape'
import { ShapeRepository } from '../domain/repositories/ShapeRepository'

export const useAddShape = (addShape: ShapeRepository['addShape']) => {
  const { addRecord } = useIndexDB()

  addRecord(() => (shape: Omit<Shape, 'id'>) => addShape(shape))
}
