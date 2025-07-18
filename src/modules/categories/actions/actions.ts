'use server';

import { prisma } from '@/lib/Prisma';

import { Product, ProductCategory, ProductVariant, VariantAttribute } from '@prisma/client';
import { error } from 'console';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { date, z } from 'zod';
const validationUpsertProductCategory = (data: Record<string, any>) => {
  const formSchema = z.object({
    name: z.string().min(3, { message: 'name must be 3 char' }),
  });
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return errors;
  }
  return null;
};
export const upsertCategory = async (
  prevData: {
    data: ProductCategory | null;
    error: Record<string, string> | null;
  },
  formData: FormData,
) => {
  const id = formData.get('id') as string | null;
  const name = formData.get('name') as string | null;
  const parentId = formData.get('parentId') as string | null;
  const categoryData: any = { name };
  if (parentId && parentId !== 'none') categoryData.parentId = parentId;

  const error = validationUpsertProductCategory(categoryData);
  if (error) {
    return { data: prevData.data, error };
  }

  try {
    let result;
    if (id) {
      result = await prisma.productCategory.update({
        where: { id },
        data: categoryData,
      });
    } else {
      result = await prisma.productCategory.create({
        data: categoryData,
      });
    }
    revalidatePath('/dashboard/categories');
    return { data: result, error: null };
  } catch (e: any) {

    return { data: prevData.data, error: { general: 'upsert failed' } };
  }
};
export const deleteCategoryAction = async (id: string) => {
  await prisma.productCategory.delete({ where: { id } });
  revalidatePath('/dashboard/categories');
};