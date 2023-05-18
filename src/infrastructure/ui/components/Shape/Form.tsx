// infrastructure/ui/components/Shape/Form.tsx

import { memo, useEffect } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FootButtons from '../FootButtons'
import { useTranslation } from '../../utils/i18n'
import routes from '../../utils/routes'
import { Shape } from '../../../../domain/models/Shape'
import Select from '../Select'

type ShapeWithoutId = Omit<Shape, 'id'>

export interface FormValues extends FieldValues {
  shape: ShapeWithoutId
}

type PropsShapesForm = {
  title: string
  labelSubmit: string
  values?: ShapeWithoutId
  onSubmit: (data: FormValues, reset: () => void) => void
}

const Form = memo(
  ({ title, labelSubmit, values, onSubmit }: PropsShapesForm) => {
    const { t } = useTranslation()

    const schema = Yup.object().shape({
      shape: Yup.object().label(t('Shape Type')),
    })

    const {
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      reset,
    } = useForm<FormValues>({
      mode: 'onChange',
      resolver: yupResolver(schema),
    })

    useEffect(() => {
      if (typeof values === 'object' && values) {
        setValue('shape', values.type)
      }
    }, [values])

    const callOnSubmit = (data: FormValues) => onSubmit(data, reset)

    return (
      <div className="container mx-auto max-w-md py-12">
        <h1 className="text-3xl font-medium my-5 dark:text-blue-300">
          {title}
        </h1>

        <form
          className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg"
          onSubmit={handleSubmit(callOnSubmit)}
        >
          <Select
            name="shape"
            title={t('Shape Type')}
            errors={errors}
            onSelected={(type: ShapeWithoutId) => {
              setValue('shape', type)
            }}
          />

          <FootButtons
            routeBack={routes.list}
            isSubmitting={isSubmitting}
            isValid={true}
            label={labelSubmit}
          />
        </form>
      </div>
    )
  }
)

export default Form
