// application/useGetShapes.ts

import { useIndexDB } from '.'

export const useGetShapes = () => {
  const { getAll } = useIndexDB()

  return getAll
}
