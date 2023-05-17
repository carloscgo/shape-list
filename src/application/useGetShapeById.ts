// application/useGetShapeById.ts

import { useIndexDB } from '.'
import { IdShape } from '../domain/models/Shape'

export const useGetShapeById = (id: IdShape) => {
  const { getByID } = useIndexDB()

  return getByID(id).then((data) => data)
}
