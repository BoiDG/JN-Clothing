import React from 'react'
import { IProductItem } from '../../interfaces'

interface IHome{
    products : IProductItem[];
}

function Home(homeInterface:IHome) {
  return (
    <div>Home</div>
  )
}

export default Home