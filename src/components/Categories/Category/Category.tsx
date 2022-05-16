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
    
    <Card  className={styles.root} title={item.name} style={{width:'100%',backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url("${item.assets[0].url}")`,backgroundSize:'cover',backgroundPosition:'center center'}}>
      <CardContent component={Link} to={`/${item.slug}/product`} style={{fontSize:'4rem',textDecoration:'none',color:'white',fontFamily: "Montserrat"}}>
  <Typography style={{fontWeight:'800'}} className = {styles.cardDesc} variant='h5' >
        {item.name} 
      </Typography>

    <Typography variant="subtitle1" className = {styles.cardDesc} style={{fontSize:'1.7rem',lineHeight:'0'}}>
        {item.description.replace(/<[^>]*>?/gm, '')} 
    </Typography>
      </CardContent>
      </Card>
    </>
  )
}

export default Category
