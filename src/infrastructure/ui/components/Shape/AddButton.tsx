import { memo } from 'react'
import { HiPlusCircle } from 'react-icons/hi2'
import { PropsAddButton } from '../../utils/interfaces'
import { SizeButton, SizeIcon } from '../../utils/constants'

const AddButton = memo(({ onAdd, ...props }: PropsAddButton) => {
  const { className, ...attrs } = props

  return (
    <div
      role="button"
      aria-label="add shape"
      className={`flex items-center justify-center cursor-pointer bg-white rounded-full w-[${SizeButton}] h-[${SizeButton}] mx-auto ${className}`}
      onClick={onAdd}
      {...attrs}
    >
      <HiPlusCircle size={SizeIcon} className="text-blue-600" />
    </div>
  )
})

export default AddButton
