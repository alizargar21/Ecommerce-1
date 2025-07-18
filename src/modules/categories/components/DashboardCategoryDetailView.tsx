import React from 'react';
import { getCategories, getCategoryById } from '@/modules/categories/services';
import CategoryFormWithActions from './CategoryFormWithAction';
const DashboardCategoriesDetailView = async (props: { id: string }) => {
  const { id } = props;
  const category = await getCategoryById(id);
  const categories = await getCategories();
  return (
    <div>
      <CategoryFormWithActions category={category} categories={categories} />
    </div>
  );
};

export default DashboardCategoriesDetailView;
