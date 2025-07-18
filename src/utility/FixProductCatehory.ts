import { ProductCategory } from "@prisma/client";

export function fixProductCategory(
  c: ProductCategory
): ProductCategory {
  return {
    ...c,
    parentId: c.parentId ?? null,
  };
}
