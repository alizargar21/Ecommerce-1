'use client';
import { getCategories } from '@/modules/categories/services/index';
import { deleteCategoryAction } from '@/modules/categories/actions/actions';
import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ProductCategory } from '@/types';
import { ConfirmDialog } from '@/components/AlertDialog';

const CategoriesTable = (props: {
  categories: Awaited<ReturnType<typeof getCategories>>;
}) => {
  const { categories } = props;

  const onDeleteCategory = async (id: string) => {
    await deleteCategoryAction(id);
  };
  return (
    <div className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-md mt-4 ">
      <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg">
        <h1 className="text-xl font-semibold">Categories</h1>
        <Button asChild>
          <Link href="/dashboard/categories/new">
            Add New Category
            <PlusCircle />
          </Link>
        </Button>
      </div>
      <div className="p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div>Name</div>
              </TableHead>
              <TableHead className="text-center">Parent</TableHead>
              <TableHead className="text-center flex justify-end items-center mr-5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="p-5">
            {categories.map((cat: ProductCategory) => (
              <TableRow key={cat.id} className="">
                <TableCell className="">
                  <div>{cat.name}</div>
                </TableCell>
                <TableCell className="text-center ">
                  {cat.parent?.name || '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 items-center">
                    <Button variant="ghost" asChild>
                      <Link href={`/dashboard/categories/${cat.id}`}>
                        <Edit />
                      </Link>
                    </Button>

                    <ConfirmDialog
                      description=""
                      onConfirm={() => onDeleteCategory(cat.id)}
                      triggerLabel={
                        <span>
                          <Trash2 />
                        </span>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                <div className="mr-10">{categories.length}</div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesTable;
