"use client"
import { AppDispatch, RootState } from '@/store'
import { fetchAttributes } from '@/store/slices/attributeSlice/attributeThunks'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GetAllAtributeSet = () => {

  const isApi= useRef<boolean>(false)
  const dispatch=useDispatch<AppDispatch>()
  const {isFetchedAttribute}= useSelector((state:RootState)=>state.attribute)
  useEffect(()=>{
    if(!isFetchedAttribute && !isApi.current){
      isApi.current=true
      dispatch(fetchAttributes())
    }else{
        isApi.current=false
    }
  },[isFetchedAttribute, dispatch])

  // For each attribute, collect all unique product values for that attribute key,
  // then push them into the attribute's options and update the Redux store.
  // useEffect(() => {
  //   if (
  //     slug === "travis-mathew" &&
  //     travismathew &&
  //     travismathew.length > 0 &&
  //     currentAttribute?.attributes
  //   ) {
  //     const updatedAttributes = currentAttribute.attributes.map((attribute) => {
  //       const attrKey = attribute.key;
  //       if (!attrKey) return attribute;

  //       // Collect unique non-empty values from products matching this attribute key
  //       const data: string[] = [];
  //       travismathew.forEach((item: TravisMathewType) => {
  //         const value = item[attrKey as keyof TravisMathewType];
  //         const strValue = value !== undefined && value !== null && value !== ""
  //           ? String(value)
  //           : null;
  //         if (strValue && !data.includes(strValue)) {
  //           data.push(strValue);
  //         }
  //       });

  //       // Return the attribute with options updated to the collected unique values
  //       return { ...attribute, options: data };
  //     });

  //     // Dispatch the updated currentAttribute back to the Redux store
  //     dispatch(setCurrentAttribute({ ...currentAttribute, attributes: updatedAttributes }));
  //   }
  // }, [slug, travismathew, currentAttribute?.attributes])


 

    
  return (
  null
  )
}

export default GetAllAtributeSet
