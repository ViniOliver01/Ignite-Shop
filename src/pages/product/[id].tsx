import Image from "next/future/image"
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'

import Stripe from "stripe";
import { stripe } from '../../lib/stripe';
import axios from "axios";

import { 
        Button, 
        ImageBoxGradient, 
        Loading, 
        ProductContainer, 
        ProductDetails 
      } from '../../styles/pages/product'
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface ProductProps {
  product:{
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps){
  const { addItem } = useShoppingCart()
  const { isFallback } = useRouter()
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  async function handleAddToCart(){
    addItem({
      name: product.name,
      description: product.description,
      id: product.id,
      price: product.price,
      currency: 'BRL',
      image: product.imageUrl,
      price_data: {defaultPriceId: product.defaultPriceId}
    })
  }

  if (isFallback) {
    return <Loading />
  }
  
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      
      <ProductContainer>
        <ImageBoxGradient>
          <Image src={product.imageUrl} width={520} height={480} alt=""/>
        </ImageBoxGradient>
        
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{new Intl.NumberFormat('pt-BR', {
                            style: 'currency', 
                            currency: 'BRL' 
                            }).format((product.price)/100)}</span>
          <p>{product.description}</p>

          <Button 
          disabled={isCreatingCheckout} 
          onClick={handleAddToCart} 
          type="button"
          >
            {isCreatingCheckout? 'Loading...' : 'Adicionar ao carrinho'}
            
          </Button>
        </ProductDetails>
        
      </ProductContainer>
    </>
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
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
      }
    }, 
    revalidate: 60 * 60 * 1, // 1 Hour
  }
}