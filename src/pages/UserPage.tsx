import { Spinner } from "@/components/ui/spinner"
import { DataTable } from "@/components/users/data-table"
import { UserColumns } from "@/components/users/UserColumns"
import { fetchUser } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"

const UserPage = () => {
  const query = useQuery({ queryKey: ["users"], queryFn: fetchUser })

  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6 mt-4">
      <h1 className="text-2xl font-bold mb-3">User Page</h1>
      <DataTable columns={UserColumns} data={query.data?.data ?? []} />
    </div>
  )
}

export default UserPage