import { Typography,Button,CardActions,CardMedia,Input, Grid, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { IProductItem } from '../../../interfaces';
import { commerce } from '../../../lib/commerce';
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles';
import "@fontsource/montserrat"; 
interface IProductDetail{
    products : IProductItem[];
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
        // fetchProduct(productId.id as string);
        item.products.forEach(a=>{
            if(a.id === productId.id){
                setProduct(a)
            }
        })
        if(product){
            setCurrImage(product.image.url);
        } 
        
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
            <Typography style={{ paddingTop:'3em',textAlign:'left',color:'grey',fontFamily: "Montserrat"}} variant="subtitle1"> 
            <Typography className={styles.urlText} component={Link} to={`/category`}>category</Typography>/
            <Typography className={styles.urlText} component={Link} to={`/${product.categories[0].slug}/product`}>{product.categories[0].slug}</Typography>/ 
            </Typography>
        <Typography style={{ textAlign:'left',fontFamily: "Montserrat",fontSize:'5rem',fontWeight:'strong',width:'70%'}}variant="h4"> {product.name} </Typography>
        <Typography style={{ textAlign:'left',fontFamily: "Montserrat",fontSize:'1.5rem'}} variant="h6"> {product.price.formatted_with_symbol}  </Typography>
        
        {product.variant_groups.map((variant_groups)=>(
                    <Grid style={{paddingTop:'5em'}} className={styles.sizeInput} justifyContent="flex-start" item xs={12} sm={6} >
                    <InputLabel style={{ paddingBottom:'.2em',fontSize:'1.25rem'}}> {variant_groups.name} </InputLabel>
                    <Select defaultValue={variant_groups.options[0].id} style={{ width:'3.5em'}} value={variant.get(variant_groups.id)} fullWidth onChange={(e:any) => setVariant(new Map<string,string>(variant.set(variant_groups.id,e.target.value)))}>
                    {variant_groups.options.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                        {item.name}
                        </MenuItem>
                    ))}
                    </Select>
                </Grid>
            ))}
            
        <CardActions style={{alignItems: 'flex-start',paddingLeft:'0'}} disableSpacing className={styles.cardActionsDetails}>

            <Grid className={styles.sizeInput} item xs={12} sm={6}>
            <InputLabel style={{ paddingBottom:'.7em',lineHeight:'0',fontSize:'1.25rem'}}> Quantity </InputLabel>
            <Input className = {styles.cardDesc + " " + styles.inputQty} type="number" onChange={(e)=> {
                e.target.value = (e.target.value <= '0') ? '1' : e.target.value;
                setQuantity(parseInt(e.target.value));
            }} value = {quantity}/>
            </Grid>
   
            
            
        <Button style={{
            borderRadius: 2,
            backgroundColor: "black",
            paddingInline:'3em',
            color:'white',
            width:'60%',
            display: 'flex',
            justifyContent:'center',
            marginTop:'3em'
        }}
    aria-label="Add to Cart" variant="contained" onClick={()=> item.onAddToCart(product, quantity,variant)}>
          <Typography variant="subtitle1" style={{fontSize:'1.5rem'}}>
          Add to Cart &nbsp;&nbsp;
        </Typography> 
        </Button>
      </CardActions>

        <Typography style={{paddingTop:'1em',textAlign:'left',width:'80%',color:'grey'}} dangerouslySetInnerHTML={{ __html: product.description}} />

        </div>
        
    </div>
    ) : (
    <>
        <Typography variant="h5"> Product not found </Typography>
    </>
    );
}

export default ProductDetail