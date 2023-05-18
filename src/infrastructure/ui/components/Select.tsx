import { Fragment, useEffect, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronUp } from 'react-icons/hi2'
import { Some } from '../../../application'
import { Shape } from '../../../domain/models/Shape'
import { useTranslation } from '../utils/i18n'
import iconsShapes from '../utils/iconShapes'

const classNames = (...classes: Some) => {
  return classes.filter(Boolean).join(' ')
}

type PropsSelected = {
  title?: string | Some
  name: string
  onSelected: (shape: Omit<Shape, 'id'>) => void
  errors: object
  [key: string]: number | string | object | undefined
}

const Select = ({ title, name, errors, onSelected }: PropsSelected) => {
  const { t } = useTranslation()

  const items = [
    {
      type: 'Circle',
      name: t('Circle'),
      icon: iconsShapes.Circle('10px'),
    },
    {
      type: 'Square',
      name: t('Square'),
      icon: iconsShapes.Square('10px'),
    },
    {
      type: 'Triangle',
      name: t('Triangle'),
      icon: iconsShapes.Triangle('10px'),
    },
  ]

  const [selected, setSelected] = useState(items[0])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { icon, ...shape } = selected

    onSelected(shape)
  }, [onSelected, selected])

  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              {title}
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  {selected.icon}
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <HiChevronUp
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {items.map((item) => (
                    <Listbox.Option
                      key={item.type}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {item.icon}
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate'
                              )}
                            >
                              {item.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      <ErrorMessage
        key={name}
        errors={errors}
        name={name}
        render={({ message }) => (
          <div className="bg-red-400 text-white rounded-md p-2 text-[0.8rem] w-full">
            {message}
          </div>
        )}
      />
    </>
  )
}

export default Select
