// infrastructure/ui/components/Layout.tsx

import { useRef } from 'react'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'

import MetaTags from './MetaTags'
import Menus from './Menu'
import ButtonTheme from './ButtonTheme'
import { LanguageSelector } from './LanguageSelector'
import Container from './Container'
import useOpenMenu from '../hooks/useOpenMenu'
import styles from '../styles/Layout.module.css'

const appName = import.meta.env.VITE_APP_TITLE

export default function Layout() {
  const sidebar = useRef<HTMLDivElement>(null)
  const maxSidebar = useRef<HTMLDivElement>(null)
  const miniSidebar = useRef<HTMLDivElement>(null)
  const maxToolbar = useRef<HTMLDivElement>(null)
  const logo = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)

  const openNav = useOpenMenu({
    sidebar,
    maxSidebar,
    miniSidebar,
    maxToolbar,
    logo,
    content,
  })

  return (
    <>
      <MetaTags />

      <div className={`${styles.content} bg-white dark:bg-[#0F172A]`}>
        <div className="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
          <div
            ref={logo}
            className="logo ml-10 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center"
          >
            {appName}
          </div>
          <div className="grow h-full flex items-center justify-center"></div>
          <div className="flex-none h-full text-center flex items-center justify-center">
            <LanguageSelector />
          </div>
        </div>

        <aside
          ref={sidebar}
          className="w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]"
        >
          <div
            ref={maxToolbar}
            className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12"
          >
            <div className="flex pl-4 items-center space-x-2 ">
              <div>
                <ButtonTheme />
              </div>
            </div>
            <div className="flex items-center space-x-2 group bg-gradient-to-r from-cyan-500 to-blue-500 pl-3 pr-2 py-1 rounded-full text-white">
              <div className="transform ease-in-out duration-300 mr-20">
                {appName}
              </div>
            </div>
          </div>
          <div
            onClick={() => openNav()}
            className="cursor-pointer -right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45"
          >
            <HiOutlineSquares2X2 />
          </div>

          <Menus maxSidebar={maxSidebar} miniSidebar={miniSidebar} />
        </aside>

        <div
          ref={content}
          className="content h-screen ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4"
        >
          <Container />
        </div>
      </div>
    </>
  )
}
