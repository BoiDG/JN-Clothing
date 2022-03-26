import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { ICategory } from '../../interfaces'
import Category from './Category/Category';

interface ICategoryTab{
    categories:ICategory[];
}

function Categories(categoryInterface:ICategoryTab) {

  return (
    <>
        {categoryInterface.categories.map((category)=>(
        <Grid style={{display:'flex',flexFlow:'column',width:'100%'}} item key={category.id}>
            <Category category={category} />
        </Grid>
        ))}
    </>
  )
}

export default Categories