'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import dayjs from 'dayjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import {
  type FileListing,
  FilesListContext
} from '@/app/_context/FilesListContext';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

type FileItem = {
  filename: string;
  createdAt: string | number;
  editedAt: string | number;
  author: string;
  _id: string;
};
const fileColumns: ColumnDef<FileItem>[] = [
  {
    accessorKey: 'filename',
    header: '文件名'
  },
  {
    accessorKey: 'createdAt',
    header: '创建时间',
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string | number;
      return <div>{dayjs(createdAt).format('YYYY/MM/DD')}</div>;
    }
  },
  {
    accessorKey: 'editedAt',
    header: '编辑时间',
    cell: ({ row }) => {
      const editedAt = row.getValue('editedAt') as string | number;
      return <div>{dayjs(editedAt).format('YYYY/MM/DD')}</div>;
    }
  },
  {
    accessorKey: 'author',
    header: '创建者',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src={row.getValue('author')} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      );
    }
  },
  {
    accessorKey: '_id',
    header: '操作',
    cell: () => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="!outline-none h-full w-full flex items-center justify-center">
              <MoreHorizontal size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="gap-3">
                <Archive size={20} /> Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    }
  }
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  data,
  columns
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  const router = useRouter();
  const jumpRouter = (id: string) => {
    router.push(`/workspace/${id}`);
  };
  return (
    <div className="rounded-md border ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-center font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="text-center"
                onClick={() => {
                  jumpRouter(row.getValue('_id') as string);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function TestTable() {
  const [data, setData] = useState<FileItem[]>([]);
  const { user }: any = useKindeBrowserClient();
  const context = useContext(FilesListContext);
  if (!context) {
    throw new Error('useFilesList must be used within a FilesListProvider');
  }
  const { fileListings } = context;

  useEffect(() => {
    if (fileListings) {
      const files = fileListings.map((file: FileListing) => {
        return {
          filename: file.fileName,
          createdAt: file._creationTime,
          editedAt: file._creationTime,
          author: user?.picture,
          _id: file._id
        };
      });
      setData(files);
    }
  }, [fileListings]);

  return (
    <div className="mt-10">
      <DataTable data={data} columns={fileColumns} />
    </div>
  );
}

export default TestTable;
