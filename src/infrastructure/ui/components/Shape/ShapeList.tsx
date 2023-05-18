import { useState, memo } from 'react'
import Item from './Item'
import Delete from './Delete'
import { IShape, PropsShapeList } from '../../utils/interfaces'

const ShapeList = memo(({ shapes, moveShape, onDelete }: PropsShapeList) => {
  const [showDelete, setShowDelete] = useState(false)
  const [itemDrag, onDrag] = useState<IShape>()

  return (
    <>
      <div className="flex w-full p-10 overflow-auto">
        {shapes.map((shape: IShape, index: number) => (
          <Item
            shape={shape}
            index={index}
            key={`${shape.id}-shape`}
            moveShape={moveShape}
            getIsMoved={setShowDelete}
            onDrag={onDrag}
          />
        ))}
      </div>

      <Delete show={showDelete} onDelete={() => onDelete(itemDrag)} />
    </>
  )
})

export default ShapeList
