import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';
import { IOrder, IInternalShippingMethods,IShippingInfo,IProvince,ICity,IShippingService } from '../../interfaces';

interface IAddressForm{
    checkoutToken:IOrder;
    saveAddressData:Function;
    onEmptyCart: Function;
}

const AddressForm = (checkoutDetail:IAddressForm|any) => {



  const axios = require('axios');
  const { checkoutToken, saveAddressData } = checkoutDetail;

  const [shippingProvinces, setShippingProvinces] = useState<IProvince[]>([]);
  const [shippingProvince, setShippingProvince] = useState<number>(0);
  const [shippingCities, setShippingCities] = useState<ICity[]>([]);
  const [shippingCity, setShippingCity] = useState(0);
  const [shippingOptions, setShippingOptions] = useState<IInternalShippingMethods[]>([
    { name:'JNE',
      kode:'jne'
    },
    { name:'POS Indonesia',
      kode:'pos'
    },
    { name:'TIKI',
      kode:'tiki'
    }]);
  const [shippingOption, setShippingOption] = useState('');
  
  const [shippingServices, setShippingServices] = useState<IShippingService[]>([]);
  const [cost, setCost] = useState(0);
  const methods = useForm();
  const register = methods.register;

  const fetchShippingProvinces = async () => {
    // const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    let url='';
    const {data} = await axios.get(url);
    setShippingProvinces(data);
    setShippingProvince(data[0].province_id);
    // setShippingProvince(shippingProvinces[0].province_id);
   
  };

  const fetchCities = async (province:number) => {
    let url='';
    const {data} = await axios.post(url,{
      province:province
    })
    
    setShippingCities(data);
    setShippingCity(data[0].city_id);
  };

  const fetchCost = async (origin:number, destination:number,courier:string) => {
    let url='';
    const {data} = await axios.post(url,{

        origin:origin,
        destination:destination,
        weight:500,
        courier: courier
      
    });
    // console.log(data)
    setShippingServices(data[0].costs);
    setCost(data[0].costs[0].cost[0].value);
    // setShippingOptions(results);
    // setShippingOption(results);
  };

  useEffect(() => {
    fetchShippingProvinces();
    console.log(shippingProvince)
    // console.log(shippingCountries)
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
    //change this according to your client-key
    const myMidtransClientKey = ''; 
   
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
   
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    }
    
  }, []);

  useEffect(() => {
    if (shippingProvince) fetchCities(shippingProvince);
  }, [shippingProvince]);

  useEffect(() => {
    if (shippingCity && shippingOption) fetchCost(152,shippingCity,shippingOption)
  }, [shippingCity,shippingOption]);

  function formatToCurrency(amount:Number){
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
  }

  const handleSubmit = async (data:IShippingInfo) => {
    // event.preventDefault();
    
    console.log('tes')
    // if (!stripe || !elements) return;

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    // if (error || !shippingData || !shippingData.data) {
    //   // console.log('[error]', error);
    // } else {
    //   
    //   };

    let parameter = {
      "transaction_details": {
          "order_id": checkoutToken?.id,
          "gross_amount": checkoutToken?.live.subtotal.raw + data.cost
      },
      "credit_card":{
          "secure" : true
      },
      "customer_details": {
          "first_name": data.data.firstName,
          "last_name": data.data.lastName,
          "email": data.data.email,
          "phone": data.data.phone
      }
    };
   
    console.log(parameter)
      try{
        
        let url='';
        const message = await axios.post(url,{
          parameter : parameter
        })
        window?.snap?.pay(message.data.token)
        
      }catch(error){
         
      }
      // nextStep();
    }
  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit((data:any) => handleSubmit({ data:{...data}, cost }))}>
          <Grid container spacing={3}>
            <FormInput {...register("firstName")} required name="firstName" label="First name" />
            <FormInput {...register("lastName")} required name="lastName" label="Last name" />
            <FormInput {...register("address1")} required name="address1" label="Address line 1" />
            <FormInput {...register("email")} required name="email" label="Email" />
            <FormInput {...register("phone")} required name="phone" label="Phone" />
            <FormInput {...register("zip")} required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Province</InputLabel>
              <Select value={shippingProvince} fullWidth onChange={(e:any) => setShippingProvince(e.target.value)}>
                {shippingProvinces.map((item) => (
                  <MenuItem key={item.province_id} value={item.province_id}>
                    {item.province}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel>City</InputLabel>
            <Select value={shippingCity} fullWidth onChange={(e:any) => setShippingCity(e.target.value)}>
                {shippingCities.map((item) => (
                  <MenuItem key={item.city_id} value={item.city_id}>
                    {item.city_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Services</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e:any) => setShippingOption(e.target.value)}>
                {shippingOptions.map((item) => (
                  <MenuItem key={item.kode} value={item.kode}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={cost} fullWidth onChange={(e:any) => setCost(e.target.value)}>
                {shippingServices.map((service) => ({ id: service.service, cost : service.cost[0].value, label: service.service + " - Rp. " + formatToCurrency(service.cost[0].value) +" - "+  service.cost[0].etd +" days"})).map((item) => (
                  <MenuItem key={item.id} value={item.cost}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
        </FormProvider>
    </>
  );
};

export default AddressForm;
