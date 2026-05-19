'use client'

import type { IUser } from '@/types/user'
import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Info, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react'

export const UserColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    header: "Image",
    cell: ({ row }) => (
      <div>
        <img
          className="aspect-square w-[70px] h-[70px] object-cover rounded-md"
          // Check this line in your columns
          src={row.original.userImages?.[0]?.imageUrl || "/image.png"}
          alt="product"
        />
      </div>
    ),
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          row.original.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {row.original.isActive ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-green-500">
            <Info className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-blue-500"
            // onClick={() => onEdit(row.original)}
          >
            <SquarePen className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500"
            // onClick={() => onDelete(row.original)} // ✅ FIXED
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]