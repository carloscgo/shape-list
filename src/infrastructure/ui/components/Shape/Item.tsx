import { useEffect, useRef, useState } from 'react'
import { PositionsT, PropsShape } from '../../utils/interfaces'
import iconsShapes from '../../utils/iconShapes'
import { Positions, SizeContainer, SizeShape } from '../../utils/constants'
import timerHover from '../../utils/timeHover'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'

const Item = ({ shape, onAdd, onDelete, showButton }: PropsShape) => {
  const [showButtons, setShowButtons] = useState(showButton)
  const refButtons = useRef<HTMLDivElement>(null)

  const onHover = () => {
    const elem = refButtons.current

    if (elem) {
      elem.style.transition = 'scale 2s'
      elem.style.transform = 'translate(-50%, -50%)'
      elem.style.scale = '0'

      timerHover(elem)

      elem.style.display = 'flex'
    }
  }

  useEffect(() => {
    showButtons && onHover()
  }, [showButtons])

  return (
    <div
      data-test="item-container"
      aria-label="item-container"
      className={`relative h-auto w-[${SizeContainer}] flex items-center justify-center px-2 left-0 top-0`}
    >
      {showButtons && (
        <div
          ref={refButtons}
          className={`absolute left-[50%] right-[50%] flex items-center justify-center h-auto w-autp`}
          onMouseMove={() => setShowButtons(true)}
        >
          <AddButton
            data-test="add-button"
            className="mt-40 mr-5 ml-0"
            onAdd={() => onAdd(Positions.left as PositionsT, shape.index)}
          />

          <DeleteButton
            data-test="delete-button"
            onDelete={() => onDelete(shape.index)}
          />

          <AddButton
            data-test="add-button"
            className="mt-40 ml-5 mr-0"
            onAdd={() => onAdd(Positions.right as PositionsT, shape.index)}
          />
        </div>
      )}

      <div
        aria-label="item"
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
