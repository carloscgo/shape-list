import { expect, describe, it, render, React } from '../../../../setupTest'
import { vi } from 'vitest'

import iconsShapes from '../../../../src/infrastructure/ui/utils/iconShapes'

vi.mock('react-icons/cg', () => ({
  CgShapeCircle: ({ size, ...props }) => (
    <svg width={size} height={size} {...props}></svg>
  ),
  CgShapeSquare: ({ size, ...props }) => (
    <svg width={size} height={size} {...props}></svg>
  ),
  CgShapeTriangle: ({ size, ...props }) => (
    <svg width={size} height={size} {...props}></svg>
  ),
}))

describe('iconsShapes', () => {
  it('should render Circle icon with size prop', () => {
    const { container } = render(<>{iconsShapes.Circle('20px')}</>)

    expect(container.querySelector('svg')).toHaveAttribute('width', '20px')
  })

  it('should render Square icon with size prop', () => {
    const { container } = render(<>{iconsShapes.Square('30px')}</>)
    expect(container.querySelector('svg')).toHaveAttribute('width', '30px')
  })

  it('should render Triangle icon with size prop', () => {
    const { container } = render(<>{iconsShapes.Triangle('40px')}</>)
    expect(container.querySelector('svg')).toHaveAttribute('width', '40px')
  })
})
