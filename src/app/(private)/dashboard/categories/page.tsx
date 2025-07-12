import CategoriesDetailView from '@/modules/categories/views/CategoryDetailView'
import React from 'react'

const page = (params : { id : string}) => {
  return (
     <div>
      <CategoriesDetailView />
    </div>
  )
}

export default page
