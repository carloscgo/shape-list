// infrastructure/ui/Container.tsx

import ProductsNew from './ProductNew'
import ProductsEdit from './ProductEdit'
import ProductsTable from './ProductsTable'
import routes, { Route, Routes } from './utils/routes'

const Container = () => {
  return (
    <Routes>
      <Route path={routes.list} element={<ProductsTable />} />
      <Route path={routes.new} element={<ProductsNew />} />
      <Route path={routes.edit} element={<ProductsEdit />} />
    </Routes>
  )
}

export default Container
