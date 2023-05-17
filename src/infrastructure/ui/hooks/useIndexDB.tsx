// infrastructure/ui/hooks/useIndexDB.tsx

import { useIndexedDB } from 'react-indexed-db'
import { Store } from '../utils/constants'

const useIndexDB = () => {
  const {
    getByID,
    getAll,
    getByIndex,
    add: addRecord,
    update: updateRecord,
    deleteRecord,
  } = useIndexedDB(Store)

  return {
    getByID,
    getAll,
    getByIndex,
    addRecord,
    updateRecord,
    deleteRecord,
  }
}

export default useIndexDB
