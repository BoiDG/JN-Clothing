import React, { useEffect, useState } from 'react';
import './App.css';
import { commerce } from './lib/commerce';
import {Products, Navbar, Cart } from './components';
import { ICart, IProductItem } from './interfaces';


function App() {
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [cart, setCart] = useState<ICart>({
    total_items:0,
    line_items : [],
    subtotal: {
      raw:0,
      formatted_with_symbol:'0',
      formatted_with_code:'0'
    }
  });

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    setCart(data);
  }

  const handleAddToCart = async (productId:string, quantity:number) =>{
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  const handleEmptyCart = async () =>{

  }

  const handleCheckoutCart = async (productId:string, quantity:number) =>{
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);
  console.log(products);

  return (
    <div className="App">
      <main>
        <Navbar cartCount={cart?.total_items} />
        <Products products={products} onAddToCart={handleAddToCart} />
        <Cart cart={cart} onCheckOut={handleCheckoutCart} EmptyCart={handleEmptyCart} />
      </main>
    </div>
  );
}

export default App;
