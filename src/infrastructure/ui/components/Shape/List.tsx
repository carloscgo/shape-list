
// modules/products/infrastructure/ui/components/ProductsTable.tsx

import { useState } from "react";
import Table from "../../../../../app/components/Table";
import Loading from "../../../../../app/components/Loading";
import useToast from "../../../../../app/hooks/useToast";
import Pagination from "../../../../../app/components/Pagination";
import HeaderList from "../../../../../app/components/HeaderList";
import { formatAmount, useTranslation } from "../../../../../app/utils/i18n";
import { Some, useDeleteProduct, useGetProducts } from "../../../../application";
import { IdProduct } from "../../../../domain/models/Shape";
import { httpAxios } from "../../instances/httpAxios";
import { productRepository } from "../../../repositories/shapeRepository";
import routes from "../../utils/routes";
import { LIMIT, TYPES } from "../../../../../app/utils/constants";

const List = () => {
    const [page, setPage] = useState(1);

    const { t } = useTranslation();

    const getProducts = productRepository(httpAxios).getProducts;
    const deleteProduct = productRepository(httpAxios).deleteProduct;

    const getProductsAction = useGetProducts(getProducts, page);
    const deleteProductAction = useDeleteProduct(deleteProduct);

    useToast(deleteProductAction.status, t('deletingProduct'), t('successfullyDeleted'), deleteProductAction.error);

    const actionDelete = (id: IdProduct) => deleteProductAction.mutate({ id, refetch: getProductsAction.refetch });

    const onPage = (page: number, type: string) => {
        if (type === TYPES.next && getProductsAction.data.length === LIMIT) {
            setPage(page);
        }

        if (type === TYPES.previous) {
            setPage(page);
        }
    }

    if (getProductsAction.loading) return <Loading />

    return (
        <div className="w-full grid grid-cols-1 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <HeaderList
                    title={t('latestProducts')}
                    description={t('listLatestProducts')}
                    labelCreate={t('createProduct')}
                    routeNew={routes.new}
                />

                {getProductsAction.data && (
                    <>
                        <Table
                            columns={[
                                {
                                    key: 'name',
                                    label: t('name')
                                },
                                {
                                    key: 'reference',
                                    label: t('reference')
                                },
                                {
                                    key: 'price',
                                    label: t('price')
                                },
                                {
                                    key: 'tax',
                                    label: t('tax')
                                },
                            ]}
                            values={getProductsAction.data.map((item: Some) => ({
                                ...item,
                                price: formatAmount(item.price),
                                tax: formatAmount(item.tax),
                            }))}
                            routesEdit={routes.edit}
                            keyId=":idProduct"
                            titleDelete={t('deleteProduct')}
                            messageDelete={t('messageDeleteProduct')}
                            actionDelete={actionDelete}
                        />

                        <Pagination current={page} length={getProductsAction.data.length} onPage={onPage} />
                    </>
                )}
            </div>
        </div>
    )
}

export default List;