import { Typography,Button,CardActions,CardMedia,Input, Grid, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IProductItem } from '../../../interfaces';
import { commerce } from '../../../lib/commerce';
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles';

interface IProductDetail{
    onAddToCart:Function;
}

function ProductDetail(item:IProductDetail) {
    
    const productId = useParams();
    const [product,setProduct] = useState<IProductItem>();
    const [quantity,setQuantity] = useState(1);
    const [currImage,setCurrImage] = useState('');
    const [variant,setVariant] = useState(new Map<string,string>());
    const styles = useStyles();

    const fetchProduct = async (id:string) => {
        const data = await commerce.products.retrieve(id, { type: 'id' });
        
        setProduct(data);
    }

    useEffect(()=> {
        fetchProduct(productId.id as string);
        if(product) setCurrImage(product.image.url);
    },[]);
    
  return product ? (
    <div className={styles.productDetailLayout}>  
        <div>
        <img className={styles.image} src={currImage!=='' ? currImage:product.image.url} alt={product.image.name} />
        <div >
            {product.assets.map((asset)=>(
                <img onClick={()=> setCurrImage(asset.url)} className={styles.imageSmol} src={asset.url} alt={asset.name}></img>
            ))}
        </div>
        </div>
        <div className={styles.description}>
        <Typography style={{ paddingTop:'1em',textAlign:'left'}}variant="h4"> {product.name} </Typography>
        <Typography style={{ textAlign:'left'}} variant="h6"> {product.price.formatted_with_symbol}  </Typography>
        
        
        <CardActions style={{alignItems: 'flex-start'}} disableSpacing className={styles.cardActionsDetails}>
            <Grid className={styles.sizeInput} item xs={12} sm={6}>
            <InputLabel style={{ paddingBottom:'.2em'}}> Quantity </InputLabel>
            <Input style={{ marginBottom:'1em'}} className = {styles.cardDesc + " " + styles.inputQty} type="number" onChange={(e)=> {
                e.target.value = (e.target.value < '0') ? ' ' : e.target.value;
                setQuantity(parseInt(e.target.value));
            }} value = {quantity}/>
            </Grid>
           
            {product.variant_groups.map((variant_groups)=>(
                    <Grid className={styles.sizeInput} justifyContent="flex-start" item xs={12} sm={6} >
                    <InputLabel style={{ paddingBottom:'.2em'}}> {variant_groups.name} </InputLabel>
                    <Select style={{ width:'20%'}} value={variant.get(variant_groups.id)} fullWidth onChange={(e:any) => setVariant(new Map<string,string>(variant.set(variant_groups.id,e.target.value)))}>
                    {variant_groups.options.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                        {item.name}
                        </MenuItem>
                    ))}
                    </Select>
                </Grid>
            ))}
        <Button aria-label="Add to Cart" variant="contained" color="primary" onClick={()=> item.onAddToCart(productId.id as string, quantity,variant)}>
          <Typography variant="subtitle1">
          Add to Cart &nbsp;&nbsp;
        </Typography> <AddShoppingCart />
        </Button>
      </CardActions>

        <Typography style={{paddingTop:'1em',textAlign:'left'}} dangerouslySetInnerHTML={{ __html: product.description}} />

        </div>
        
    </div>
    ) : (
    <>
        <Typography variant="h5"> Product not found </Typography>
    </>
    );
}

export default ProductDetail