import Image from "next/future/image"
import Stripe from "stripe";
import { stripe } from '../../lib/stripe';
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';

import { Button, ImageBoxGradient, ProductContainer, ProductDetails } from '../../styles/pages/product'

import shirtImg from '../../assets/shirt/Variant6.png'

interface ProductProps {
  product:{
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
  }
}


export default function Product({ product }: ProductProps){
  const {query} = useRouter();
  
  return (
    // <h1>Product {JSON.stringify(query)}</h1>
    <ProductContainer>
      <ImageBoxGradient>
        <Image src={product.imageUrl} width={520} height={480} alt=""/>
      </ImageBoxGradient>
      
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <Button type="button">Comprar agora</Button>
      </ProductDetails>
      
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () =>{
  return {
    paths: [
      { params: { id: 'prod_MeGFbxgwtZmAdk' } }
    ],
    fallback: false,
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
      }
    }, 
    revalidate: 60 * 60 * 1, // 1 Hour
  }
}