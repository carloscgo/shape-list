import {
  expect,
  describe,
  it,
  render,
  fireEvent,
  React,
} from '../../../../../setupTest'
import { vi } from 'vitest'

import AddButton from '../../../../../src/infrastructure/ui/components/Shape/AddButton'
import { SizeButton } from '../../../../../src/infrastructure/ui/utils/constants'

describe('AddButton', () => {
  const mockOnClick = vi.fn()

  it('should render without crashing', () => {
    const { container } = render(<AddButton onAdd={mockOnClick} />)

    expect(container).toMatchSnapshot()
  })

  it('should invoke the onAdd callback when clicked', () => {
    const { getByRole } = render(<AddButton onAdd={mockOnClick} />)
    const addButton = getByRole('button')
    fireEvent.click(addButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should render with the correct classes', () => {
    const { getByRole } = render(
      <AddButton onAdd={mockOnClick} className="test-class" />
    )
    const addButton = getByRole('button')
    expect(addButton).toHaveClass('bg-white')
    expect(addButton).toHaveClass('rounded-full')
    expect(addButton).toHaveClass(`w-[${SizeButton}]`)
    expect(addButton).toHaveClass(`h-[${SizeButton}]`)
    expect(addButton).toHaveClass('mx-auto')
    expect(addButton).toHaveClass('test-class')
  })

  it('should render without classes', () => {
    const { getByRole } = render(<AddButton onAdd={mockOnClick} />)
    const addButton = getByRole('button')
    expect(addButton).toHaveClass('bg-white')
    expect(addButton).toHaveClass('rounded-full')
    expect(addButton).toHaveClass(`w-[${SizeButton}]`)
    expect(addButton).toHaveClass(`h-[${SizeButton}]`)
    expect(addButton).toHaveClass('mx-auto')
  })

  it('should render with custom attributes', () => {
    const { getByRole } = render(
      <AddButton onAdd={mockOnClick} data-testid="test-id" />
    )
    const addButton = getByRole('button')
    expect(addButton).toHaveAttribute('data-testid', 'test-id')
  })
})
