// infrastructure/ui/components/Container.tsx

import { memo } from 'react'
import ShapesNew from './Shape/New'
import ShapesList from './Shape/List'
import routes, { Route, Routes } from '../utils/routes'

const Container = memo(() => {
  return (
    <Routes>
      <Route path={routes.new} element={<ShapesNew />} />
      <Route path={routes.list} element={<ShapesList />} />
    </Routes>
  )
})

export default Container
