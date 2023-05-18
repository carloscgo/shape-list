// infrastructure/ui/components/ShapesTable.tsx

import { memo, useCallback, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import update from 'immutability-helper'
import {
  useDeleteShape,
  useEditShape,
  useGetShapes,
} from '../../../../application'
import { IdShape, Shape } from '../../../../domain/models/Shape'
import Loading from '../Loading'
import ShapeList from './ShapeList'
import useToast from '../../hooks/useToast'
import useStatus from '../../hooks/useStatus'
import { useTranslation } from '../../utils/i18n'
import { Status } from '../../utils/constants'
import { isTouchDevice } from '../../utils/touchDevice'
import iconsShapes from '../../utils/iconShapes'
import routes from '../../utils/routes'

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend

const List = memo(() => {
  const { t } = useTranslation()

  const [shapes, setShapes] = useState<Shape[]>([])
  const [deleting, setDeleting] = useState(false)
  const { status, setStatus, error, setError } = useStatus()

  const getShapesAction = useGetShapes()
  const deleteShapeAction = useDeleteShape()
  const updateShapeAction = useEditShape()

  const moveShape = (dragIndex: number, hoverIndex: number) => {
    const draggedShape = shapes[dragIndex]

    setShapes(
      update(shapes, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedShape],
        ],
      })
    )
  }

  useToast(status, t('deletingShape'), t('successfullyDeleted'), error)

  const loadShapes = () => {
    getShapesAction().then((data: Shape[]) => {
      setShapes(data)
    })
  }

  useEffect(() => {
    loadShapes()
  }, [])

  const actionDelete = (id: IdShape) => {
    if (!id) return

    setDeleting(true)
    setStatus(Status.loading)
    setError(undefined)

    deleteShapeAction(id)
      .then(() => {
        setStatus(Status.success)

        loadShapes()
      })
      .catch((error) => {
        setError(error)
        setStatus(Status.error)
      })
      .finally(() => {
        const timer = setTimeout(() => {
          setDeleting(false)

          clearTimeout(timer)
        }, 100)
      })
  }

  useEffect(() => {
    if (!deleting) {
      shapes.forEach((shape, index) => {
        const id = index + 1

        updateShapeAction({
          id,
          shape: {
            ...shape.shape,
            id,
          },
        })
      })
    }
  }, [shapes, deleting])

  if (status === Status.loading || deleting) return <Loading />

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <DndProvider backend={backendForDND}>
          <ShapeList
            shapes={shapes
              .filter((shape) => shape.id)
              .map((shape: Shape) => ({
                id: shape.id,
                type: shape.shape.type,
                icon: iconsShapes[`${shape.shape.type}`],
              }))}
            moveShape={moveShape}
            onDelete={(shape) => actionDelete(shape.id)}
          />
        </DndProvider>
      </div>
    </div>
  )
})

export default List
