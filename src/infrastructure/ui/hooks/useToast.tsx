// infrastructure/ui/hooks/useToast.tsx

import { useEffect } from 'react'
import { Notyf } from 'notyf'
import { useTranslation } from '../utils/i18n'
import { Status } from '../utils/constants'

const notyf = new Notyf({
  duration: 1000,
  dismissible: true,
  position: {
    x: 'right',
    y: 'top',
  },
})

const useToast = (
  status: string | null,
  message: string,
  success: string,
  error?: string
) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (status) {
      if (status === Status.loading) {
        notyf.open({
          message,
          type: 'custom',
          background: '#fff',
          className: 'text-black',
        })
      }

      if (status === Status.success) {
        notyf.success(success)
      }

      if (status === Status.error) {
        notyf.error(`${t('somethingWentWrong')} - ${error}`)
      }
    }
  }, [status, error, success, message, t])
}

export default useToast
