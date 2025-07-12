import React from 'react';
import { getCategories } from '@/modules/categories/services';
import CategoryFormAction from '@/modules/categories/components/CategoryFormAction';
const CategoriesDetailView = async (props: { id: string }) => {
  const { id } = props;
//   const category = await getCategoryById(id);
  const categories = await getCategories();
console.log(categories)
  return (
    <div>
      <CategoryFormAction
//         categories={categories}
        />
    </div>
  );
};

export default CategoriesDetailView;