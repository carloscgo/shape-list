import {
  expect,
  describe,
  it,
  render,
  fireEvent,
  React,
} from '../../../../setupTest'
import { LanguageSelector } from '../../../../src/infrastructure/ui/components/LanguageSelector'

describe('LanguageSelector', () => {
  it('should render without crashing', () => {
    const { getByLabelText } = render(<LanguageSelector />)

    const languageSelector = getByLabelText('language-selector')
    expect(languageSelector).toBeInTheDocument()
  })

  it('should show all available languages', async () => {
    const { getByRole, findByRole, getAllByText } = render(<LanguageSelector />)

    const languageSelectorButton = getByRole('button', {
      name: /English/, // change this to your default language
    })

    fireEvent.click(languageSelectorButton)

    const menu = await findByRole('menu')
    expect(menu).toBeInTheDocument()

    const languages = ['English', 'Español'] // change to your desired languages

    languages.forEach((language) => {
      const listItem = getAllByText(language)[0]
      expect(listItem).toBeInTheDocument()
    })
  })

  it('should change the language when a different language is selected', async () => {
    // setup: render component
    const { getByRole, findByRole, container } = render(<LanguageSelector />)

    // find the default language button (i.e., the currently selected language)
    const languageSelectorButton = getByRole('button', {
      name: /English/, // change this to your default language
    })

    // open the dropdown list by clicking on the button
    fireEvent.click(languageSelectorButton)

    // find the button for the target language
    const targetLanguageButton = await findByRole('menuitem', {
      name: /Español/, // change this to your target language
    })

    // simulate a click event on the target button
    fireEvent.click(targetLanguageButton)

    expect(container).toMatchSnapshot()
  })
})
