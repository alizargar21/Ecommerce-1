import React from 'react';
import { Button } from '../components/ui';
import Link from 'next/link'
export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
     <Button asChild className="mt-6">
        <Link href={'/products'}>Go to products</Link>
      </Button>
      <Button asChild className="mt-6">
        <Link href={'/dashboard'}>Go to Dashboard</Link>
      </Button>
    </div>
  );
}
