import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { ICategory } from '../../../interfaces'
import useStyles from './styles';
import {Link} from 'react-router-dom';

interface ICategoryItem{
    category:ICategory;
}

function Category(categoryData:ICategoryItem) {
    const item = categoryData.category;
    const styles = useStyles();
    console.log(item);
  return (
    <>
    
    <Card className={styles.root} style={{width:'100%'}}>
      <CardMedia component={Link} to={`/${item.slug}/product`}className={styles.media} image ={item.assets[0].url} title={item.name} />
      
      </Card>
      <div style={{width:'100%',color:'white',backgroundColor:'black'}}>
      <Typography className = {styles.cardContent} variant='h5' >
        {item.name} 
      </Typography>

    <Typography variant="subtitle1" className = {styles.cardDesc}>
        {item.description.replace(/<[^>]*>?/gm, '')} 
    </Typography>
      </div>
    </>
  )
}

export default Category
