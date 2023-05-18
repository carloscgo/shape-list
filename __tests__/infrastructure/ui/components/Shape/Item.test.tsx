import {
  expect,
  describe,
  it,
  render,
  fireEvent,
  React,
} from '../../../../../setupTest'
import { vi } from 'vitest'

import Item from '../../../../../src/infrastructure/ui/components/Shape/Item'
import { Shape } from '../../../../../src/domain/models/Shape'

describe('Item', () => {
  const mockOnAdd = vi.fn()
  const mockOnDelete = vi.fn()

  it('should render without crashing', () => {
    const shape = { type: 'Circle', index: 0 } as Shape
    render(<Item shape={shape} onAdd={mockOnAdd} onDelete={mockOnDelete} />)
  })

  it('should show the add and delete buttons on hover', () => {
    const shape = { type: 'Circle', index: 0 } as Shape
    const { getAllByLabelText, getByTestId } = render(
      <Item
        shape={shape}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        showButton={true}
      />
    )
    const itemContainer = getByTestId('item-container')
    fireEvent.mouseOver(itemContainer)
    expect(getAllByLabelText('add shape')[0]).toBeInTheDocument()
    expect(getAllByLabelText('delete shape')[0]).toBeInTheDocument()
  })

  it('should invoke the onAdd callback when the add button is clicked', () => {
    const shape = { type: 'Circle', index: 0 } as Shape
    const { getAllByLabelText } = render(
      <Item
        shape={shape}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        showButton={true}
      />
    )
    const addButton = getAllByLabelText('add shape')[0]
    fireEvent.click(addButton)
    expect(mockOnAdd).toHaveBeenCalledTimes(1)
  })

  it('should invoke the onDelete callback when the delete button is clicked', () => {
    const shape = { type: 'Circle', index: 0 } as Shape
    const { getAllByLabelText } = render(
      <Item
        shape={shape}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        showButton={true}
      />
    )
    const deleteButton = getAllByLabelText('delete shape')[0]
    fireEvent.click(deleteButton)
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })
})
