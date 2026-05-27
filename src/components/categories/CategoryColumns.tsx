'use client';

import type { ICategory } from '@/types/category';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { SquarePen, Trash2 } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const CategoryColumns: ColumnDef<ICategory>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'image',
    header: "Image",
    cell: ({ row }) => (
      <div>
        <img
          className="aspect-square w-[70px] h-[70px] object-cover rounded-md"
          // Check this line in your columns
          src={row.original.categoryImages?.[0]?.imageUrl || "/image.png"}
          alt="product"
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
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
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="border border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 transition-all duration-200 shadow-sm"
          
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 shadow-sm"
          
        >
          <SquarePen className="h-4 w-4 text-blue-500" />
        </Button>
      </div> 
    ),
  },
];
