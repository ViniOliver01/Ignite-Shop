import Image from "next/future/image"
import Stripe from "stripe";
import { stripe } from '../../lib/stripe';
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from "axios";

import { 
        Button, 
        ImageBoxGradient, 
        Loading, 
        ProductContainer, 
        ProductDetails 
      } from '../../styles/pages/product'
import { useState } from "react";

interface ProductProps {
  product:{
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}


export default function Product({ product }: ProductProps){
  const { isFallback } = useRouter()
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  async function handleBuy(){
    console.log(product.defaultPriceId);
    setIsCreatingCheckout(true)
    try {
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      alert('Falha ao redirecionar')
      setIsCreatingCheckout(false)
    }
  }

  if (isFallback) {
    return <Loading />
  }
  
  return (
    <ProductContainer>
      <ImageBoxGradient>
        <Image src={product.imageUrl} width={520} height={480} alt=""/>
      </ImageBoxGradient>
      
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <Button 
        disabled={isCreatingCheckout} 
        onClick={handleBuy} 
        type="button"
        >
          {isCreatingCheckout? 'Loading...' : 'Comprar agora'}
          
        </Button>
      </ProductDetails>
      
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () =>{
  return {
    paths: [ 
      { params: { id: 'prod_MeGFvxgyuKNPN3' } },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const productId = String(params.id)

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency', 
          currency: 'BRL' 
          }).format(price.unit_amount/100),
        description: product.description,
        defaultPriceId: price.id,
      }
    }, 
    revalidate: 60 * 60 * 1, // 1 Hour
  }
}