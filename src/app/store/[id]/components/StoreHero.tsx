import React from 'react';

export default function StoreHero({ id }: { id: string }) {
  return (
    <div>
      <h1>Store: {id}</h1>
    </div>
  );
}
