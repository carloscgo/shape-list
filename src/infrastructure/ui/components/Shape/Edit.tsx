// infrastructure/ui/components/Shape/New.tsx

import { useEditShape, useGetShapeById } from '../../../../application'
import ShapesForm, { FormValues } from './Form'
import useToast from '../../hooks/useToast'
import useStatus from '../../hooks/useStatus'
import { useTranslation } from '../../utils/i18n'
import { Status } from '../../utils/constants'
import { useParams } from '../../utils/routes'
import { IdShape, Shape } from '../../../../domain/models/Shape'
import { useEffect, useState } from 'react'

const Edit = () => {
  const { idShape } = useParams()
  const [values, setValues] = useState<Shape>()
  const { status, setStatus, error, setError } = useStatus()

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
    setError(undefined)

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
