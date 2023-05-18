import {
  expect,
  describe,
  it,
  render,
  fireEvent,
  React,
} from '../../../../setupTest'
import ButtonTheme from '../../../../src/infrastructure/ui/components/ButtonTheme'
import { getItemStorage } from '../../../../src/infrastructure/ui/hooks/useLocalStorage'

describe('ButtonTheme', () => {
  it('should change the theme to dark mode when clicking on the moon icon', () => {
    const { getByLabelText } = render(<ButtonTheme />)
    const moonIcon = getByLabelText('moon icon')
    fireEvent.click(moonIcon)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should change the theme to light mode when clicking on the sun icon', () => {
    const { getByLabelText } = render(<ButtonTheme />)
    const sunIcon = getByLabelText('sun icon')
    fireEvent.click(sunIcon)
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('should update the local storage when changing themes', () => {
    const { getByLabelText } = render(<ButtonTheme />)
    const moonIcon = getByLabelText('moon icon')
    const sunIcon = getByLabelText('sun icon')

    fireEvent.click(moonIcon)
    expect(getItemStorage('theme')).toBe('dark')

    fireEvent.click(sunIcon)
    expect(getItemStorage('theme')).toBe('light')
  })
})
