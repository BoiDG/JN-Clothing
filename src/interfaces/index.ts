import React from "react";

// -- product model --
interface Image{
    url:string;
    name:string;
    file_extension:string;
}
interface IPrice{
    raw:number;
    formatted_with_symbol:string; // Rp50,000.00
    formatted_with_code:string; // 50,000.00 IDR
}

export interface IProductItem{
    id: string;
    name:string;
    price: IPrice;
    description: string;
    image: Image;
    line_total:IPrice;
    quantity:number;
    // variant : IVariantItem;
}
// -- end --

// -- cart model --
export interface ICart{
    id:string;
    total_items?:number;
    line_items:IProductItem[];
    subtotal:IPrice;
}
// -- end --

interface IGateways{

}
export interface IShippingMethods{
    id:string;
    countries:string[];
    description:string;
    price:IPrice;
}
export interface IOrder{
    id:string;
    cart_id:string;
    gateways:IGateways;
    product:IProductItem[];
    shipping_methods:IShippingMethods[];
    line_items:IProductItem[];
    live:ICart;
}

export interface IUserCredentials{
    firstName:string;
    lastName:string;
    address1:string;
    email:string;
    city:string;
    zip:string;
}

export interface IShippingInfo{ 
    data:IUserCredentials;
    shippingCountry:string;
    shippingSubdivision:string;
    shippingOption:string;
}

export interface IVariantItem{
    key:string;
    text:string;
    value:string;
}

