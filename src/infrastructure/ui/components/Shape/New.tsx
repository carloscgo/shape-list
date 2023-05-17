// infrastructure/ui/components/ShapesNew.tsx

import { useAddShape } from '../../../../application'
import ShapesForm, { FormValues } from './Form'
import useToast from '../../hooks/useToast'
import useStatus from '../../hooks/useStatus'
import { useTranslation } from '../../utils/i18n'
import { Status } from '../../utils/constants'

const New = () => {
  const { status, setStatus, error, setError } = useStatus()

  const { t } = useTranslation()

  const addShapeAction = useAddShape()

  useToast(status, t('creatingShape'), t('successfullyCreated'), error)

  const onSubmit = (data: FormValues, reset: () => void) => {
    setStatus(Status.loading)
    setError(undefined)

    addShapeAction(data)
      .then(() => {
        reset()

        setStatus(Status.success)
      })
      .catch((error) => {
        setError(error)
        setStatus(Status.error)
      })
  }

  return (
    <ShapesForm
      title={t('createAnewShape')}
      labelSubmit={t('createShape')}
      onSubmit={onSubmit}
    />
  )
}

export default New
