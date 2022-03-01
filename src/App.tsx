import React, { useEffect, useState } from 'react';
import './App.css';
import { commerce } from './lib/commerce';
import {Products, Navbar, Cart,Checkout, ProductDetail, Categories, Home } from './components';
import { ICart, ICategory, IOrder, IProductItem } from './interfaces';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [cart, setCart] = useState<ICart>({
    id:'',
    total_items:0,
    line_items : [],
    subtotal: {
      raw:0,
      formatted_with_symbol:'0',
      formatted_with_code:'0'
    }
  });

  const [order, setOrder] = useState<IOrder>();
  const [errorMessage, setErrorMessage] = useState('');
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCategories = async () => {
    const {data} = await commerce.categories.list();
    setCategories(data);
  }

  const fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    setCart(data);
  }

  const handleAddToCart = async (productId:string, quantity:number,variant:any) =>{
    const item = await commerce.cart.add(productId, quantity,Object.fromEntries(variant));
    setCart(item.cart);
  }

  const handleUpdateCartQty = async (lineItemId:string, quantity:number) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId:string) => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId:string, newOrder:IOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error:any) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(()=>{
    fetchCart();
    fetchCategories();
    fetchProducts();
  },[]);


  return (
    <Router>
    <div className="App">
      <main>
        <Navbar cartCount={cart?.total_items} categories={categories} />
        <Routes>
          <Route path="/" element={
            <Home products={products} />
            } />
          <Route path="/category" element={
          <Categories categories={categories} />
          } />
          <Route path="/:category/product" element={
          <Products products={products} onAddToCart={handleAddToCart} />
          } />
          <Route path="/product/:id" element={
            <ProductDetail onAddToCart={handleAddToCart} />
          } />
          <Route path="/cart" element={
          <Cart cart={cart} EmptyCart={handleEmptyCart} onUpdateQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
          } />

          <Route path="/checkout" element={
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          } />
        </Routes>
      </main>
    </div>
    </Router>
  );
}

export default App;
