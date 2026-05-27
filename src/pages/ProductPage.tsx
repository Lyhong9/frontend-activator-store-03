import { ProductColumns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/users/data-table"
import { useProducts } from "@/hooks/useProducts";
import { CirclePlus } from "lucide-react";


const ProductPage = () => {

  const { data  } = useProducts();

  return (
    <div className="px-4 lg:px-6 mt-4">
      <h1 className="text-2xl font-bold mb-3">Product Page</h1>
            <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Search products..."
          className="w-[300px]"
        />
        <Button>
          <CirclePlus />
          Create Product
        </Button>
      </div>
      <DataTable columns={ProductColumns} data={data?.data ?? []} />
    </div>
  )
}

export default ProductPage 