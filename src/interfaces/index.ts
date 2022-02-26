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
    // variant : IVariantItem;
}
// -- end --

// -- cart model --
export interface ICart{
    total_items?:number;
    line_items:IProductItem[];
    subtotal:IPrice;
}
// -- end --


export interface IVariantItem{
    key:string;
    text:string;
    value:string;
}

