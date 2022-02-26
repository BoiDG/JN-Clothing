import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product/Product';
import { IProductItem } from '../../interfaces';

interface IProducts{
    products : IProductItem[];
    onAddToCart : Function;
}

const Products = (products:IProducts) =>{
    console.log(products)
    return (
        <Grid container justify="center" spacing={1}>
            {
                products.products.map((product) => (
                    <Grid style={{marginInline:'auto'}} item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product onAddToCart={products.onAddToCart} product={product} />
                    </Grid>
                ))
            }
        </Grid>
    )

}

export default Products;