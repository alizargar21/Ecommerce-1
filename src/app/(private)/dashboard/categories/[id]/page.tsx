import Spinner from '@/components/Spinner';
import DashboardCategoryDetailView from '@/modules/categories/components/DashboardCategoryDetailView';
import React, { Suspense } from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const data = await params;
  const { id } = data;

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <DashboardCategoryDetailView id={id} />
      </Suspense>
    </div>
  );
};

export default page;
