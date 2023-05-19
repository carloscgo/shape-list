// infrastructure/ui/components/Shapes/List.tsx

import { memo, useEffect, useState } from 'react'
import orderBy from 'lodash/orderBy'

import { IdShape, Shape, TypeShape } from '../../../../domain/models/Shape'
import ShapeList from './ShapeList'
import { PositionsT } from '../../utils/interfaces'
import { useTranslation } from '../../utils/i18n'
import useShapes from '../../hooks/useShapes'

const List = memo(({ shapesInit = [] }: { shapesInit?: Shape[] }) => {
  const { t } = useTranslation()

  const [shapes, setShapes] = useState<Shape[]>(shapesInit)

  const { add, remove } = useShapes()

  const loadShapes = () =>
    setShapes((shapes) =>
      orderBy(shapes, ['index'], 'asc').map((shape: Shape) => ({
        index: shape.index,
        type: shape.type,
      }))
    )

  useEffect(() => {
    loadShapes()
  }, [])

  const actionDelete = (index: IdShape) => remove(index, shapes, setShapes)

  const actionAdd = (position: PositionsT, type: TypeShape, index: IdShape) =>
    add(index, position, type, shapes, setShapes)

  return (
    <div
      role="list"
      aria-label="container-main-shapes"
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="w-full h-10 mb-4 flex items-center justify-center bg-blue-600 dark:bg-blue-800 text-white">
        <h2 aria-label="header-title">{t('Figure Manager')}</h2>
      </div>

      <div className="bg-gray-100 dark:bg-[#1E293B] w-full h-full flex items-center justify-center shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <ShapeList shapes={shapes} onAdd={actionAdd} onDelete={actionDelete} />
      </div>

      <div className="w-full h-5 mt-4 flex items-center justify-start text-black dark:text-white">
        <p>
          Developed by{' '}
          <a
            href="https://github.com/carloscgo/shape-list"
            className="hover:text-blue-700 underline"
            target="_blank"
            aria-label="developer"
          >
            Carlos Camacho
          </a>
        </p>
      </div>
    </div>
  )
})

export default List
