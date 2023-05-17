// infrastructure/ui/components/ShapesTable.tsx

import Table from '../Table'
import Loading from '../Loading'
import useToast from '../../hooks/useToast'
import useStatus from '../../hooks/useStatus'
import { useTranslation } from '../../utils/i18n'
import { Some, useDeleteShape, useGetShapes } from '../../../../application'
import { IdShape, Shape } from '../../../../domain/models/Shape'
import routes from '../../utils/routes'
import { useEffect, useState } from 'react'
import { Status } from '../../utils/constants'

const List = () => {
  const { t } = useTranslation()

  const [values, setValues] = useState<Shape[]>()
  const { status, setStatus, error, setError } = useStatus()

  const getShapesAction = useGetShapes()
  const deleteShapeAction = useDeleteShape()

  useToast(status, t('deletingShape'), t('successfullyDeleted'), error)

  useEffect(() => {
    if (getShapesAction) {
      getShapesAction.then((data: Shape[]) => {
        setValues(data)
      })
    }
  }, [getShapesAction])

  const actionDelete = (id: IdShape) => {
    setStatus(Status.loading)
    setError(undefined)

    deleteShapeAction(id)
      .then(() => setStatus(Status.success))
      .catch((error) => {
        setError(error)
        setStatus(Status.error)
      })
  }

  if (status === Status.loading) return <Loading />

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        {values && (
          <>
            <Table
              columns={[
                {
                  key: 'name',
                  label: t('name'),
                },
                {
                  key: 'reference',
                  label: t('reference'),
                },
                {
                  key: 'price',
                  label: t('price'),
                },
                {
                  key: 'tax',
                  label: t('tax'),
                },
              ]}
              values={values.map((item: Some) => ({
                ...item,
                price: item.price,
                tax: item.tax,
              }))}
              routesEdit={routes.edit}
              keyId=":idShape"
              titleDelete={t('deleteShape')}
              messageDelete={t('messageDeleteShape')}
              actionDelete={actionDelete}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default List
