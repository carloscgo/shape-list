/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  expect,
  describe,
  it,
  act,
  render,
  screen,
  fireEvent,
  beforeAll,
  React,
} from '../../../../../setupTest'
import { vi } from 'vitest'

import ShapeList from '../../../../../src/infrastructure/ui/components/Shape/ShapeList'
import { Shape } from '../../../../../src/domain/models/Shape'

describe('ShapeList', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    }
  })

  const shapes = [{ index: 1, type: 'Circle' }] as Shape[]

  it('should render a list of shapes', () => {
    const mockOnAdd = vi.fn()
    const mockOnDelete = vi.fn()
    const shapes = [
      { index: 1, type: 'Circle' },
      { index: 2, type: 'Square' },
    ] as Shape[]
    render(
      <ShapeList shapes={shapes} onAdd={mockOnAdd} onDelete={mockOnDelete} />
    )
    const shapeList = screen.getByRole('list')
    expect(shapeList).toBeInTheDocument()
  })

  it('should display a modal when the add button is clicked when list is empty', () => {
    const mockOnAdd = vi.fn()
    const mockOnDelete = vi.fn()
    const { getByRole, getByLabelText } = render(
      <ShapeList shapes={[]} onAdd={mockOnAdd} onDelete={mockOnDelete} />
    )
    const addButton = getByLabelText('add shape')
    act(() => {
      fireEvent.click(addButton)
    })
    const modal = getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  it('should display a modal when the add button is clicked', () => {
    vi.useFakeTimers()
    const mockOnAdd = vi.fn()
    const mockOnDelete = vi.fn()
    const { getAllByLabelText } = render(
      <ShapeList shapes={shapes} onAdd={mockOnAdd} onDelete={mockOnDelete} />
    )
    const item = getAllByLabelText('item')[0]
    act(() => {
      fireEvent.mouseOver(item)
    })
    vi.runAllTimers()
    const addButton = getAllByLabelText('add shape')[0]
    act(() => {
      fireEvent.click(addButton)
    })
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  it('should call the delete callback when a shape is deleted', () => {
    vi.useFakeTimers()
    const mockOnAdd = vi.fn()
    const mockOnDelete = vi.fn()
    const { getAllByLabelText } = render(
      <ShapeList shapes={shapes} onAdd={mockOnAdd} onDelete={mockOnDelete} />
    )
    const item = getAllByLabelText('item')[0]
    act(() => {
      fireEvent.mouseOver(item)
    })
    vi.runAllTimers()
    const deleteButton = screen.getByLabelText('delete shape')
    act(() => {
      fireEvent.click(deleteButton)
    })
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })
})
