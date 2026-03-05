import React from 'react';
import StoreHero from './components/StoreHero';
import ProductCard from './components/ProductCard';

export default function StorePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <StoreHero id={params.id} />
      <div>
        <ProductCard />
      </div>
    </div>
  );
}
