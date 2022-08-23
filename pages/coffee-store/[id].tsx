import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const CoffeeStore = () => {
  const {id} = useRouter().query
  console.log(id)
  return (
    <div>
      <Link href="/"><a>back to home </a></Link>
      
      Coffee shop {id}
    
    </div>
  )
}

export default CoffeeStore