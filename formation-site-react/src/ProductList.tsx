import React, { useEffect, useState } from 'react';
import ApiProduct from './services/api_product'; // Import the api_product module

interface Product {
  id: number;
  name: string;
  price: string;
  permalink: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const api = new ApiProduct(); // Create an instance of the ApiProduct class

    useEffect(() => {
        api.getProducts().then((data) => {
            setProducts(data);
        });
        }, [api]);

  return (
    <div>
      <h2>Liste des produits</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={product.permalink}>{product.name}</a> - {product.price}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;