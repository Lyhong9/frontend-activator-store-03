
import { CategoryColumns } from "@/components/categories/CategoryColumns"
import { Spinner } from "@/components/ui/spinner"
import { DataTable } from "@/components/users/data-table"
import { fetchCategory } from "@/services/category.service"
import { useQuery } from "@tanstack/react-query"

const CategoryPage = () => {
  const query = useQuery({ queryKey: ["categories"], queryFn: fetchCategory })

  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6 mt-4">
      <h1 className="text-2xl font-bold mb-3">Category Page</h1>
      <DataTable columns={CategoryColumns} data={query.data?.data ?? []} />
    </div>
  )
}

export default CategoryPage 