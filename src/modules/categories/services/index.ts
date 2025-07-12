import { prisma } from '@/lib/Prisma';
import { ProductCategory } from '@/types';
export const getCategories = async () => {
          const res = await prisma.productCategory.findMany({
                    include: { parent: true },
          });
          console.log(res)
          return res as ProductCategory[];
};