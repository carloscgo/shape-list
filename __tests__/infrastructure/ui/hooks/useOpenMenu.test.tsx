import { useRef } from 'react'
import {
  expect,
  describe,
  it,
  renderHook,
  render,
  fireEvent,
  React,
} from '../../../../setupTest'
import useOpenMenu from '../../../../src/infrastructure/ui/hooks/useOpenMenu'

describe('Use Open Menu Hook', () => {
  const Component = () => {
    const sidebar = useRef<HTMLDivElement>(null)
    const maxSidebar = useRef<HTMLDivElement>(null)
    const miniSidebar = useRef<HTMLDivElement>(null)
    const maxToolbar = useRef<HTMLDivElement>(null)
    const logo = useRef<HTMLDivElement>(null)
    const content = useRef<HTMLDivElement>(null)

    const props = {
      sidebar,
      maxSidebar,
      miniSidebar,
      maxToolbar,
      logo,
      content,
    }

    const openNav = useOpenMenu(props)

    return (
      <div aria-label="openNav" onClick={() => openNav()}>
        <div ref={sidebar}></div>
        <div ref={maxSidebar}></div>
        <div ref={miniSidebar}></div>
        <div ref={maxToolbar}></div>
        <div ref={logo}></div>
        <div ref={content}></div>
      </div>
    )
  }

  it('should toggle classnames when called', () => {
    const { getByLabelText, container } = render(<Component />)

    const openNav = getByLabelText('openNav')

    fireEvent.click(openNav)

    expect(container).toMatchSnapshot()

    fireEvent.click(openNav)

    expect(container).toMatchSnapshot()
  })
})
