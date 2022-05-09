import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

type Product = {
  id: number;
  type: string;
  name: string;
  description: string;
  discount: Discount;
  images: Image[];
}

type Discount = {
  id: number;
  amount: number;
  description: string;
}

type Image = {
  color: string;
  imagePath: string;
}

export const AllProducts = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + 'Product');
      const data = await response.json();

      setProducts(data.result as Product[]);
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchData();
  },[])

  if(isLoading){
    return <div>
      <p><em>Loading...</em></p>
    </div>
  }

  return <div>
          <ul>
            {products.map(product => <li key={product.id}>{product.name}</li> )}
      </ul>
  </div>
}
