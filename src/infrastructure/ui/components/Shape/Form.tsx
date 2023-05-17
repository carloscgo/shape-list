// infrastructure/ui/components/Shape/Form.tsx

import { type FieldValues, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../Input'
import FootButtons from '../FootButtons'
import { useTranslation } from '../../utils/i18n'
import routes from '../../utils/routes'
import { useEffect } from 'react'
import { Shape } from '../../../../domain/models/Shape'

export interface FormValues extends FieldValues {
  title: string
  reference: string
  description: string
  price: number
  tax: number
}

type PropsShapesForm = {
  title: string
  labelSubmit: string
  values?: Shape
  onSubmit: (data: FormValues, reset: () => void) => void
}

const Form = ({ title, labelSubmit, values, onSubmit }: PropsShapesForm) => {
  const { t } = useTranslation()

  const schema = Yup.object().shape({
    name: Yup.string().label(t('name')).trim().required().min(3).max(30),
    reference: Yup.string()
      .label(t('reference'))
      .trim()
      .required()
      .min(3)
      .max(30),
    description: Yup.string()
      .label(t('description'))
      .trim()
      .required()
      .max(100),
    price: Yup.number().label(t('price')).required(),
    tax: Yup.number().label(t('tax')).required(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (typeof values === 'object' && values) {
      setValue('name', values.name)
      setValue('reference', values.reference)
      setValue('description', values.description)
      setValue('price', values.price as number)
      setValue('tax', values.tax as number)
    }
  }, [values, setValue])

  const callOnSubmit = (data: FormValues) => onSubmit(data, reset)

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-3xl font-medium my-5 dark:text-blue-300">{title}</h1>

      <form
        className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg"
        onSubmit={handleSubmit(callOnSubmit)}
      >
        <Input
          name="name"
          title={t('name')}
          register={register}
          errors={errors}
          validations={{ required: true, maxLength: 30 }}
        />
        <Input
          name="reference"
          title={t('reference')}
          register={register}
          errors={errors}
          validations={{ required: true, maxLength: 30 }}
        />
        <Input
          name="description"
          title={t('description')}
          register={register}
          errors={errors}
          validations={{ required: true, maxLength: 100 }}
        />
        <Input
          name="price"
          title={t('price')}
          type="number"
          step="0.01"
          min="0.1"
          register={register}
          errors={errors}
          validations={{ required: true, min: '0.1' }}
        />
        <Input
          name="tax"
          title={t('tax')}
          type="number"
          step="0.01"
          min="0.1"
          register={register}
          errors={errors}
          validations={{ required: true, min: '0.1' }}
        />

        <FootButtons
          routeBack={routes.list}
          isSubmitting={isSubmitting}
          isValid={isValid}
          label={labelSubmit}
        />
      </form>
    </div>
  )
}

export default Form
