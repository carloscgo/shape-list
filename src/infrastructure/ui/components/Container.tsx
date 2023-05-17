// infrastructure/ui/components/Container.tsx

import ShapesNew from './Shape/New'
import ShapesEdit from './Shape/Edit'
import ShapesList from './Shape/List'
import routes, { Route, Routes } from '../utils/routes'

const Container = () => {
  return (
    <Routes>
      <Route path={routes.new} element={<ShapesNew />} />
      <Route path={routes.edit} element={<ShapesEdit />} />
      <Route path={routes.list} element={<ShapesList />} />
    </Routes>
  )
}

export default Container
