// infrastructure/ui/components/Menu.tsx

import { BiHome } from 'react-icons/bi'
import routes, { Link } from '../utils/routes'
import { useTranslation } from '../utils/i18n'

type PropsMenu = {
  maxSidebar: React.MutableRefObject<HTMLDivElement | null>
  miniSidebar: React.MutableRefObject<HTMLDivElement | null>
}

export default function Menu({ maxSidebar, miniSidebar }: PropsMenu) {
  const { t } = useTranslation()

  const ItemsMenu = [
    {
      label: t('Home'),
      url: routes.home,
      icon: <BiHome />,
    },
  ]

  return (
    <>
      <div
        ref={maxSidebar}
        className="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]"
      >
        {ItemsMenu.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3"
          >
            {item.icon}
            <div>{item.label}</div>
          </Link>
        ))}
      </div>

      <div
        ref={miniSidebar}
        className="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]"
      >
        {ItemsMenu.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </>
  )
}
