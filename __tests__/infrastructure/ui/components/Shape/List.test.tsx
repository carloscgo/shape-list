/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  expect,
  describe,
  it,
  render,
  screen,
  fireEvent,
  beforeAll,
  React,
} from '../../../../../setupTest'
import { vi } from 'vitest'

import List from '../../../../../src/infrastructure/ui/components/Shape/List'
import { Shape } from '../../../../../src/domain/models/Shape'

describe('List', () => {
  const shapesInit = [{ index: 1, type: 'Circle' }] as Shape[]

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

  it('should render a list of shapes', () => {
    render(<List />)
    const shapeList = screen.getAllByRole('list')[0]
    expect(shapeList).toBeInTheDocument()
  })

  it('should call the onAdd callback when a shape is added', () => {
    vi.useFakeTimers()
    const { container, getAllByLabelText } = render(
      <List shapesInit={shapesInit} />
    )
    const item = getAllByLabelText('item')[0]
    fireEvent.mouseOver(item)
    vi.runAllTimers()
    const addBtn = getAllByLabelText('add shape')[0]
    fireEvent.click(addBtn)
    expect(container).toMatchSnapshot()
  })

  it('should call the onDelete callback when a shape is deleted', () => {
    vi.useFakeTimers()
    const { container, getAllByLabelText } = render(
      <List shapesInit={shapesInit} />
    )
    const item = getAllByLabelText('item')[0]
    fireEvent.mouseOver(item)
    vi.runAllTimers()
    const deleteBtn = getAllByLabelText('delete shape')[0]
    fireEvent.click(deleteBtn)
    expect(container).toMatchSnapshot()
  })
})
