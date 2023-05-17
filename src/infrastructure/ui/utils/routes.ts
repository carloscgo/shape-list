// infrastructure/ui/utils/routes.ts

import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'

const routes = {
  home: '/',
  list: '/',
  new: '/shape/new',
  edit: '/shape/edit',
  details: '/shape/details',
}

export default routes
export { BrowserRouter, Routes, Route, Link, useParams }
