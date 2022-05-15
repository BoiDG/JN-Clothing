import React, { useEffect, useState } from 'react';
import './App.css';
import { commerce } from './lib/commerce';
import {Products, Navbar, Cart,Checkout, ProductDetail, Categories, Home } from './components';
import { ICart, ICategory, IOrder, IProductItem,IVariantCart } from './interfaces';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Announcement from './components/Announcement/Announcement';
import "@fontsource/montserrat"; 
import useStyles from './style';
import { RestaurantMenuTwoTone } from '@material-ui/icons';

function App() {
  const styles = useStyles();
  const [loading,setLoading] = useState(false);
  const [checkoutLoading,setCheckoutLoading] = useState(false);
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [cart, setCart] = useState<ICart>({
    id:'',
    total_items:0,
    line_items : [],
    subtotal: {
      raw:0,
      formatted:'0',
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

  const handleAddToCart = async (product:IProductItem, quantity:number,variant:any) =>{
    const toAddProd = {...product};
    toAddProd.quantity = quantity;
    const selected_option:IVariantCart[] = [];

    if(toAddProd.variant_groups.length>0){
      [variant.keys()].forEach(e => {
        let len = selected_option.length;
        toAddProd.variant_groups.forEach(a=>{
          selected_option.push({
            group_id: '',
            group_name:'',
            option_id:'',
            option_name:''
          })
          if(a.id === e){
            selected_option[len].group_id = a.id;
            selected_option[len].group_name = a.name;
            a.options.forEach(c => {
              if(c.id === variant[e]){
                selected_option[len].option_id = c.id;
                selected_option[len].option_name = c.name;
              }
            })
            // selected_option.options = a.options;
          }
        })
      });
    }

    toAddProd.selected_options = selected_option;

    cart.line_items.push({...toAddProd});
    if(cart.total_items!==undefined){
      cart.total_items += quantity;
    }
    const newCart = {...cart};
    setCart(newCart);
    // console.log(newCart)
    setLoading(true);
    const response = await commerce.cart.add(product.id, quantity, Object.fromEntries(variant));
    setCart(response.cart);
    setLoading(false);
    // console.log(response.cart)
  }

  function formatToCurrency(amount:Number){
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
  }

  const handleUpdateCartQty = async (lineItemId:string, quantity:number) => {
    
    cart.line_items.filter((item)=>(item.id === lineItemId)).map((item)=>{
      if(quantity>0){
        item.quantity = quantity;
        item.line_total.raw = item.price.raw*item.quantity;
        item.line_total.formatted = formatToCurrency(item.line_total.raw);
        item.line_total.formatted_with_symbol = item.line_total.formatted+' IDR';
        item.line_total.formatted_with_code = 'Rp'+item.line_total.formatted;
      }else{
        handleRemoveFromCart(lineItemId);
      
      } 
    })
    
    var sum =0;
    let price = cart.subtotal.raw/(cart.total_items===undefined ? 1 : cart.total_items);
    cart.line_items.forEach((e)=>{sum+=e.quantity})
    cart.total_items = sum;
    cart.subtotal.raw = price*sum;
    cart.subtotal.formatted = formatToCurrency(cart.subtotal.raw)
    cart.subtotal.formatted_with_symbol = cart.subtotal.formatted+' IDR';
    cart.subtotal.formatted_with_code = 'Rp'+cart.subtotal.formatted;
    const newCart = {...cart};
    setCart(newCart);
    console.log(cart)
    setCheckoutLoading(true)
    await commerce.cart.update(lineItemId, { quantity });
    setCheckoutLoading(false)
  };

  const handleRemoveFromCart = async (lineItemId:string) => {
    
    //console.log(cart);
    //console.log(data);
    if(cart.total_items!==undefined && cart.total_items>0){
      let toRemove = cart.line_items.filter((item)=>(item.id === lineItemId))[0];
      cart.total_items -= toRemove.quantity;
      cart.line_items = cart.line_items.filter((item)=>(item.id !== lineItemId));
      cart.subtotal.raw -= toRemove.price.raw*toRemove.quantity;
      cart.subtotal.formatted = formatToCurrency(cart.subtotal.raw)
      cart.subtotal.formatted_with_symbol = cart.subtotal.formatted+' IDR';
      cart.subtotal.formatted_with_code = 'Rp'+cart.subtotal.formatted;
    }
    if(cart.line_items.length === 0 ){
      handleEmptyCart();
      cart.subtotal.raw = 0;
      cart.subtotal.formatted = formatToCurrency(cart.subtotal.raw)
      cart.subtotal.formatted_with_symbol = cart.subtotal.formatted+' IDR';
      cart.subtotal.formatted_with_code = 'Rp'+cart.subtotal.formatted;
      return;
    }
    const newCart = {...cart};
    setCart(newCart);
    setCheckoutLoading(true)
    await commerce.cart.remove(lineItemId);
    setCheckoutLoading(false)
    // setCart(response.cart)
  };

  const handleEmptyCart = async () => {
    
    cart.line_items = [];
    cart.total_items=0;
    const newCart = {...cart};
    setCart(newCart);
    await commerce.cart.empty();
    setLoading(true);
    refreshCart()
    setLoading(false);
    // setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId:string, newOrder:IOrder) => {
    console.log(cart.line_items.length)

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
            <Cart cart={cart} EmptyCart={handleEmptyCart} onUpdateQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} loading={loading} />
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

