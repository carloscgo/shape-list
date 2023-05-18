import { memo } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import { PropsDeleteButton } from '../../utils/interfaces'
import { SizeButton, SizeIcon } from '../../utils/constants'

const DeleteButton = memo(({ onDelete, ...props }: PropsDeleteButton) => {
  const { className, ...attrs } = props

  return (
    <div
      role="button"
      aria-label="delete shape"
      className={`flex items-center justify-center cursor-pointer bg-white rounded-full w-[${SizeButton}] h-[${SizeButton}] mx-auto ${className}`}
      onClick={onDelete}
      {...attrs}
    >
      <HiOutlineTrash size={SizeIcon} className="text-red-600" />
    </div>
  )
})

export default DeleteButton
