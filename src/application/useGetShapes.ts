// application/useGetShapes.ts

import { useIndexDB } from '.'
import { ShapeRepository } from '../domain/repositories/ShapeRepository'

export const useGetShapes = (getShapes: ShapeRepository['getShapes']) => {
  const { getAll } = useIndexDB()

  getAll().then((data) => getShapes(data))
}
