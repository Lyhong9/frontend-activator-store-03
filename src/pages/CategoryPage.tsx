
import { CategoryColumns } from "@/components/categories/CategoryColumns"
import { DataTable } from "@/components/users/data-table"
import { useCategories } from "@/hooks/useCategories";

const CategoryPage = () => {

  const { data  } = useCategories();

  return (
    <div className="px-4 lg:px-6 mt-4">
      <h1 className="text-2xl font-bold mb-3">Category Page</h1>
      <DataTable columns={CategoryColumns} data={data?.data ?? []} />
    </div>
  )
}

export default CategoryPage 