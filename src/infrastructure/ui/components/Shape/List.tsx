// infrastructure/ui/components/Shapes/List.tsx

import { memo, useEffect, useState } from 'react'
import orderBy from 'lodash/orderBy'

import { IdShape, Shape, TypeShape } from '../../../../domain/models/Shape'
import ShapeList from './ShapeList'
import iconsShapes from '../../utils/iconShapes'
import { PositionsT } from '../../utils/interfaces'
import useShapes from '../../hooks/useShapes'

const List = memo(() => {
  const [shapes, setShapes] = useState<Shape[]>([])

  const { add, remove } = useShapes()

  const loadShapes = () =>
    setShapes((shapes) => orderBy(shapes, ['index'], 'asc'))

  useEffect(() => {
    loadShapes()
  }, [])

  const actionDelete = (index: IdShape) => remove(index, shapes, setShapes)

  const actionAdd = (position: PositionsT, type: TypeShape, index: IdShape) =>
    add(index, position, type, shapes, setShapes)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-gray-100 dark:bg-[#1E293B] w-full h-full flex items-center justify-center shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <ShapeList
          shapes={shapes.map((shape: Shape) => ({
            index: shape.index,
            type: shape.type,
          }))}
          onAdd={actionAdd}
          onDelete={actionDelete}
        />
      </div>
    </div>
  )
})

export default List
