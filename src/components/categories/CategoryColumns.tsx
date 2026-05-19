'use client';

import type { ICategory } from '@/types/category';
import type { ColumnDef } from '@tanstack/react-table';

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
  }
];
