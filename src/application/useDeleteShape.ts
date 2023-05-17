// application/useDeleteShape.ts

import { useIndexDB } from '.'
import { ShapeRepository } from '../domain/repositories/ShapeRepository'
import { IdShape } from '../domain/models/Shape'

export const useDeleteShape = (deleteShape: ShapeRepository['deleteShape']) => {
  const { deleteRecord } = useIndexDB()

  deleteRecord(
    () =>
      ({ id }: { id: IdShape }) =>
        deleteShape(id)
  )
}
