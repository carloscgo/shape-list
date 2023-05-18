// infrastructure/ui/utils/constants.ts

export const Status = {
  loading: 'loading',
  success: 'success',
  error: 'error',
}

export const Positions = {
  left: 'left',
  right: 'right',
}

export const Store = 'shapes'

export const SizeButton = '50px'

export const SizeIcon = '40px'

export const SizeShape = '200px'

export const SizeContainer = '300px'

// Properties to Modal Component

export const PropsTransitionChild1 = {
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
}

export const PropsTransitionChild2 = {
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
  enterTo: 'opacity-100 translate-y-0 sm:scale-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
  leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
}

export const classIcon = (color: string) =>
  ({
    red: `h-6 w-6 text-red-600`,
    indigo: `h-6 w-6 text-indigo-600`,
  }[color])

export const classButton = (color: string) =>
  ({
    red: `inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto`,
    indigo: `inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto`,
  }[color])
