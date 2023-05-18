// infrastructure/ui/components/Container.tsx

import { memo } from 'react'
import ShapesList from './Shape/List'
import routes, { Route, Routes } from '../utils/routes'

const Container = memo(() => {
  return (
    <Routes>
      <Route path={routes.list} element={<ShapesList />} />
    </Routes>
  )
})

export default Container
