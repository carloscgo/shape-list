import { useEffect, useRef, useState } from 'react'
import { PositionsT, PropsShape } from '../../utils/interfaces'
import iconsShapes from '../../utils/iconShapes'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import { Positions, SizeContainer, SizeShape } from '../../utils/constants'

const Item = ({ shape, onAdd, onDelete }: PropsShape) => {
  const [showButtons, setShowButtons] = useState(false)
  const refButtons = useRef<HTMLDivElement>(null)

  const onHover = () => {
    const elem = refButtons.current

    if (elem) {
      elem.style.transition = 'scale 2s'
      elem.style.transform = 'translate(-50%, -50%)'
      elem.style.scale = '0'

      const timer = setTimeout(() => {
        elem.style.scale = '1'

        clearTimeout(timer)
      }, 150)

      elem.style.display = 'flex'
    }
  }

  useEffect(() => {
    showButtons && onHover()
  }, [showButtons])

  return (
    <div
      className={`relative h-auto w-[${SizeContainer}] flex items-center justify-center px-2 left-0 top-0`}
    >
      {showButtons && (
        <div
          ref={refButtons}
          className={`absolute left-[50%] right-[50%] flex items-center justify-center h-auto w-autp`}
          onMouseMove={() => setShowButtons(true)}
        >
          <AddButton
            className="mt-40 mr-5 ml-0"
            onAdd={() => onAdd(Positions.left as PositionsT, shape.index)}
          />

          <DeleteButton onDelete={() => onDelete(shape.index)} />

          <AddButton
            className="mt-40 ml-5 mr-0"
            onAdd={() => onAdd(Positions.right as PositionsT, shape.index)}
          />
        </div>
      )}

      <div
        className={`h-[${SizeShape}] w-[${SizeShape}] object-cover bg-transparent`}
        onMouseOver={() => setShowButtons(true)}
        onMouseOut={() => setShowButtons(false)}
      >
        {iconsShapes[shape.type](SizeShape)}
      </div>
    </div>
  )
}

export default Item
