"use client"
import React from 'react'
import { TravisMathewCatalogWorkspace } from './TravisMathewCatalogWorkspace'
import GetAllProducts from '../GetAllProducts'
import UpdateBrandAttribute from '../UpdateBrandAttribute'
import GetAllBrands from '@/components/brands/GetAllBrands'
import GetAllAtributeSet from '@/components/attributeSet/GetAllAtributeSet'

const TravisHome = () => {

  return (
    <>
  <TravisMathewCatalogWorkspace/>
  <GetAllProducts/>
  <UpdateBrandAttribute/>
  <GetAllBrands/>    
  <GetAllAtributeSet/>
  </>
  )
}

export default TravisHome