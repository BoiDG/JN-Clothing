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
    console.log(item)
  return (
    <Card className={styles.root} >
      {/* <CardMedia className={styles.media} image ={item.image.url} title={item.name} /> */}
       <CardContent component={Link} to={`/${item.slug}/product`}>
        <div className = {styles.cardContent}>
          <Typography variant='h5' >
            {item.name} 
          </Typography>
        </div> 
        <Typography variant='subtitle1' className = {styles.cardDesc} >
            {item.description.replace(/<[^>]*>?/gm, '')} 
        </Typography>
        
      </CardContent> 
      </Card>
  )
}

export default Category
