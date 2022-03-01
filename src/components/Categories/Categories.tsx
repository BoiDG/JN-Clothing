import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { ICategory } from '../../interfaces'
import Category from './Category/Category';

interface ICategoryTab{
    categories:ICategory[];
}

function Categories(categoryInterface:ICategoryTab) {
    console.log(categoryInterface.categories);
  return (
    <Grid style={{marginTop:'5em'}} container justify="center" spacing={1}>
        {categoryInterface.categories.map((category)=>(
        <Grid style={{marginInline:'auto'}} item key={category.id} xs={12} sm={6} md={4} lg={3}>
            <Category category={category} />
        </Grid>
        ))}
    </Grid>
  )
}

export default Categories