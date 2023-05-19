import { memo, useState } from 'react'
import Item from './Item'
import { IdShape, Shape, TypeShape } from '../../../../domain/models/Shape'
import AddButton from './AddButton'
import Modal from '../Modal'
import { PositionsT, PropsShapeList } from '../../utils/interfaces'
import { useTranslation } from '../../utils/i18n'
import iconsShapes from '../../utils/iconShapes'

const ShapeList = memo(({ shapes, onAdd, onDelete }: PropsShapeList) => {
  const { t } = useTranslation()

  const [showModal, setShowModal] = useState(false)
  const [shapeNew, setShapeNew] = useState({
    position: null as unknown as PositionsT,
    index: 0 as IdShape,
    type: null as unknown as TypeShape,
  })

  const onType = (type: TypeShape) =>
    setShapeNew((state) => ({ ...state, type }))

  return (
    <>
      <div
        role="list"
        aria-label="container shapes"
        className="flex w-full p-10 overflow-auto"
      >
        {shapes.map((shape: Shape) => (
          <Item
            key={`${shape.index}${shape.type}-shape`}
            shape={shape}
            onAdd={(position, index) => {
              setShapeNew({
                position,
                index,
                type: null as unknown as TypeShape,
              })

              setShowModal(true)
            }}
            onDelete={onDelete}
          />
        ))}

        {!shapes.length && (
          <AddButton
            className="my-20 mx-auto"
            onAdd={() => {
              setShapeNew({
                position: null as unknown as PositionsT,
                index: 0,
                type: null as unknown as TypeShape,
              })

              setShowModal(true)
            }}
          />
        )}

        <Modal
          color="indigo"
          title={t('createShape')}
          labelButton={t('confirm')}
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() =>
            onAdd(shapeNew.position, shapeNew.type, shapeNew.index)
          }
        >
          <div className="flex items-center justify-center mx-auto my-10">
            {['Circle', 'Square', 'Triangle'].map((shape) => (
              <div
                key={shape}
                className={`cursor-pointer mx-auto rounded-full p-2 ${
                  shapeNew.type === shape ? 'bg-cyan-100' : ''
                }`}
                onClick={() => onType(shape as TypeShape)}
              >
                {iconsShapes[shape as TypeShape]('100px')}
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </>
  )
})

export default ShapeList
