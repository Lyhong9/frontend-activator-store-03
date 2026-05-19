import { ProductColumns } from "@/components/products/ProductColumns"
import { Spinner } from "@/components/ui/spinner"
import { DataTable } from "@/components/users/data-table"
import { fetchProduct } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"

const ProductPage = () => {
  const query = useQuery({ queryKey: ["products"], queryFn: fetchProduct })

  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6 mt-4">
      <h1 className="text-2xl font-bold mb-3">Product Page</h1>
      <DataTable columns={ProductColumns} data={query.data?.data ?? []} />
    </div>
  )
}

export default ProductPage 