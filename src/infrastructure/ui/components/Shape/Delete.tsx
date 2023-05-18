import { memo } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import { DragDropT, PropsDeleteDrop } from '../../utils/interfaces'

const Delete = memo(({ show, onDelete }: PropsDeleteDrop) => {
  const handleDrop = (e: DragDropT) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'drop') {
      onDelete()
    }
  }

  if (!show) return null

  return (
    <div
      className="flex border-[1px] border-red-600 border-dashed rounded-full items-center justify-center w-[300px] h-[300px] mx-auto"
      onDragOver={handleDrop}
      onDrop={handleDrop}
    >
      <HiOutlineTrash size="150" className="text-red-600" />
    </div>
  )
})

export default Delete
