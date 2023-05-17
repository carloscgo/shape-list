// application/useAddShape.ts

import { useIndexDB } from '.'

export const useAddShape = () => {
  const { addRecord } = useIndexDB()

  return addRecord
}
