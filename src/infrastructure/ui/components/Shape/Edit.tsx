// infrastructure/ui/components/Shape/New.tsx

import { useParams } from 'react-router-dom'
import { useEditShape, useGetShapeById } from '../../../../application'
import ShapesForm, { FormValues } from './Form'
import useToast from '../../hooks/useToast'
import { useTranslation } from '../../utils/i18n'
import { IdShape, Shape } from '../../../../domain/models/Shape'
import { useEffect, useState } from 'react'
import { Status } from '../../utils/constants'

const Edit = () => {
  const { idShape } = useParams()
  const [values, setValues] = useState<Shape>()
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | undefined>()

  const { t } = useTranslation()

  const editShapeAction = useEditShape()
  const getShapeByIdAction = useGetShapeById(idShape as IdShape)

  useEffect(() => {
    if (getShapeByIdAction) {
      getShapeByIdAction.then((data: Shape) => setValues(data))
    }
  }, [getShapeByIdAction])

  useToast(status, t('editingShape'), t('successfullyUpdated'), error)

  const onSubmit = (data: FormValues) => {
    setStatus(Status.loading)

    editShapeAction({ id: idShape, ...data })
      .then(() => setStatus(Status.success))
      .catch((error) => {
        setError(error)
        setStatus(Status.error)
      })
  }

  return (
    <ShapesForm
      title={t('editShape')}
      labelSubmit={t('editShape')}
      values={values}
      onSubmit={onSubmit}
    />
  )
}

export default Edit
