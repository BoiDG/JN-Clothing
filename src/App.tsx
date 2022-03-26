import React, { useEffect, useState } from 'react';
import './App.css';
import { commerce } from './lib/commerce';
import {Products, Navbar, Cart,Checkout, ProductDetail, Categories, Home } from './components';
import { ICart, ICategory, IOrder, IProductItem } from './interfaces';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Announcement from './components/Announcement/Announcement';
import "@fontsource/montserrat"; 
import useStyles from './style';


function App() {
  const styles = useStyles();
  
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
  const updateHandleAddToCartUI = (product:IProductItem, quantity:number,variant:any) =>{
    product.quantity = quantity;
    if( product.variant_groups.length>0){
      product.variant_groups[0].options = [variant];
    }
    cart.line_items.push(product);
    if(cart.total_items){
      cart.total_items += quantity;
    }
    setCart(cart);
  }
  const handleAddToCart = async (product:IProductItem, quantity:number,variant:any) =>{
    commerce.cart.add(product.id, quantity,Object.fromEntries(variant));

    await updateHandleAddToCartUI(product,quantity,variant);

    
  }

  const handleUpdateCartQty = async (lineItemId:string, quantity:number) => {
    commerce.cart.update(lineItemId, { quantity });
    cart.line_items.filter((item)=>(item.id === lineItemId)).map((item)=>{
      item.quantity = quantity;
    })
    var sum =0;
    cart.line_items.forEach((e)=>{sum+=e.quantity})
    cart.total_items = sum;
    setCart(cart);
  };

  const handleRemoveFromCart = async (lineItemId:string) => {
    commerce.cart.remove(lineItemId);
    console.log(cart);
    if(cart.total_items){
      cart.total_items -= cart.line_items.filter((item)=>(item.id === lineItemId))[0].quantity;
      cart.line_items = cart.line_items.filter((item)=>(item.id !== lineItemId));
    }
    console.log(cart);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    commerce.cart.empty();
    cart.line_items = [];
    setCart(cart);
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
      <main className={styles.root}>
        {/* <Announcement/> */}
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

