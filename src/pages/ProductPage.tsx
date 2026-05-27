import { ProductColumns } from "@/components/products/ProductColumns";
import { DataTable } from "@/components/users/data-table"
import { useProducts } from "@/hooks/useProducts";


const ProductPage = () => {

  const { data  } = useProducts();

  return (
    <div className="px-4 lg:px-6 mt-4">
      <h1 className="text-2xl font-bold mb-3">Product Page</h1>
      <DataTable columns={ProductColumns} data={data?.data ?? []} />
    </div>
  )
}

export default ProductPage 