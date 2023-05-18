import { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemT, PropsShape } from '../../utils/interfaces'
import iconsShapes from '../../utils/iconShapes'

const type = 'Image'

const Item = ({ shape, index, moveShape, getIsMoved, onDrag }: PropsShape) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: type,
    hover(item: ItemT) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index

      if (dragIndex === index) {
        return
      }

      moveShape(dragIndex, index)

      item.index = index
    },
  })

  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { id: shape.id, index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  drag(drop(ref))

  useEffect(() => {
    getIsMoved(isDragging)

    if (isDragging) {
      onDrag(shape)
    }
  }, [getIsMoved, isDragging, onDrag, shape])

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
      <div
        id={`${shape.type}-${shape.id}-${index}`}
        className="h-[200px] w-[200px] object-cover bg-transparent"
      >
        {iconsShapes[shape.type]('200px')}
      </div>
    </div>
  )
}

export default Item
