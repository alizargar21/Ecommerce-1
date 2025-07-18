import React from 'react'
import { getCategories } from '../services';
import CategoriesTable from '../components/CategoriesTable';
import CategoryTreeWrapper from '../components/CategoryWrapper';
const DashboardCategoryView =async () => {
            const categories = await getCategories();
  console.log(categories);
  return (
    <div>
       <CategoriesTable categories={categories} />
      <CategoryTreeWrapper flatCategories={categories} />
    </div>
  )
}

export default DashboardCategoryView
