import { DataTable } from "@/components/users/data-table"
import { UserColumns } from "@/components/users/UserColumns";
import { useUsers } from "@/hooks/useUsers";


const UserPage = () => {

  const { data  } = useUsers();

  return (
    <div className="px-4 lg:px-6 mt-4">
      <h1 className="text-2xl font-bold mb-3">User Page</h1>
      <DataTable columns={UserColumns} data={data?.data ?? []} />
    </div>
  )
}

export default UserPage 