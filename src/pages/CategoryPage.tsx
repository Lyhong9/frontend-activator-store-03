import { CategoryColumns } from '@/components/categories/CategoryColumns'
import { CreateCategoryDialog } from '@/components/categories/CreateCategoryDialog'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable } from '@/components/users/data-table'
import { useCategories } from '@/hooks/useCategories'
import { useState } from 'react'

const CategoryPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(7)

  const { data } = useCategories({ search, page, limit })

  const pagination = data?.pagination
  const pages = Array.from({ length: pagination?.totalPages ?? 0 }, (_, i) => i + 1)

  const handlePageChange = (newPage: number | null) => {
    if (newPage) setPage(newPage)
  }

  return (
    <div className="px-4 lg:px-6 mt-4">
      <h1 className="text-2xl font-bold mb-3">Category Page</h1>
      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Search categories..."
          className="w-[300px]"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPage(1) // reset to page 1 on new search
          }}
        />
        <CreateCategoryDialog />
      </div>

      <DataTable columns={CategoryColumns} data={data?.data ?? []} />

      <Pagination className="flex justify-end mt-3">
        <Select
          defaultValue={String(limit)}
          onValueChange={(value: string) => {
            setLimit(Number(value))
            setPage(1) // reset to page 1 on limit change
          }}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:cursor-pointer"
              onClick={() => handlePageChange(pagination?.prevPage)}
            />
          </PaginationItem>
          {pages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => setPage(pageNumber)}
                isActive={pageNumber === page}
                className="hover:cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="hover:cursor-pointer"
              onClick={() => handlePageChange(pagination?.nextPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default CategoryPage