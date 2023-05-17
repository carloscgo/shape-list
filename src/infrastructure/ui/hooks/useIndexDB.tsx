import { useIndexedDB } from 'react-indexed-db'

const useIndexDB = () => {
  const {
    getByID,
    getAll,
    getByIndex,
    add: addRecord,
    update: updateRecord,
    deleteRecord,
  } = useIndexedDB('shapes')

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
