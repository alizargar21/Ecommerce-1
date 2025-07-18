import { prisma } from '@/lib/Prisma';

import { fixProductCategory } from '@/utility/FixProductCatehory';
export const getCategories = async () => {
          const res = await prisma.productCategory.findMany({
                    include : {parent : true , children : true , products : true}
          });
    return res.map(fixProductCategory);
        
};
export const getCategoryById = async (id: string) => {
  const res = await prisma.productCategory.findFirst({
    where: { id },
  });
  if (!res) {
    return null;
  }
  return res;
};