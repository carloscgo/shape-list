// infrastructure/ui/components/Modal.tsx

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RiInformationFill } from 'react-icons/ri'
import { useTranslation } from '../utils/i18n'
import {
  PropsTransitionChild1,
  PropsTransitionChild2,
  classIcon,
  classButton,
} from '../utils/constants'
import { PropsModal } from '../utils/interfaces'

export default function Modal({
  color,
  title,
  message,
  children,
  labelButton,
  show,
  onConfirm,
  onClose,
}: PropsModal) {
  const [open, setOpen] = useState(show)
  const cancelButtonRef = useRef(null)

  useEffect(() => {
    setOpen(show)
  }, [show])

  const { t } = useTranslation()

  const callOnClose = () => {
    setOpen(false)
    onClose(false)
  }

  const callOnConfirm = () => {
    onConfirm()
    callOnClose()
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child as={Fragment} {...PropsTransitionChild1}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child as={Fragment} {...PropsTransitionChild2}>
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-start">
                    <div className="flex w-full h-10 p-2 items-center justify-start rounded-full border-blue-400 border-[1px]">
                      <RiInformationFill
                        className={classIcon(color)}
                        aria-hidden="true"
                      />

                      <Dialog.Title
                        as="h3"
                        className="flex items-center mx-2 font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                    </div>
                    <div className="mt-2 w-full text-center">
                      {message && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{message}</p>
                        </div>
                      )}

                      {children && (
                        <div className="w-[100%] mx-auto">{children}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={classButton(color)}
                    onClick={() => callOnConfirm()}
                  >
                    {labelButton}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => callOnClose()}
                    ref={cancelButtonRef}
                  >
                    {t('cancel')}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
