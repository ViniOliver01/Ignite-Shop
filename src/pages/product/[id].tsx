import Image from "next/future/image"
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'

import Stripe from "stripe";
import { stripe } from '../../lib/stripe';

import { 
        Button, 
        ImageBoxGradient, 
        Loading, 
        ProductContainer, 
        ProductDetails, 
        ProductDetailsDescription, 
        RadioArea, 
        RadioButtom,
        RadioIndicator,
      } from '../../styles/pages/product'
import { useShoppingCart } from "use-shopping-cart";
import * as RadioGroup from '@radix-ui/react-radio-group';

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
          <ProductDetailsDescription>
            <h1>{product.name}</h1>
            <span>{new Intl.NumberFormat('pt-BR', {
                              style: 'currency', 
                              currency: 'BRL' 
                              }).format((product.price)/100)}</span>
            <p>{product.description}</p>
          </ProductDetailsDescription>
          
          <form action="">
            <RadioArea defaultValue="default">

              <RadioButtom value="P" id="r1" disabled={true}>
                <RadioIndicator />
                <p>P</p>
              </RadioButtom>

              <RadioButtom value="M" id="r2">
                <RadioIndicator />
                <p color="unchecked">M</p>
              </RadioButtom>

              <RadioButtom value="G" id="r3">
                <RadioIndicator />
                <p color="unchecked">G</p>
              </RadioButtom>

              <RadioButtom value="GG" id="r4">
                <RadioIndicator />
                <p>GG</p>
              </RadioButtom>


            </RadioArea>
          </form>
          

          
          

          <Button 
          onClick={handleAddToCart} 
          type="button"
          >
            {'Adicionar ao carrinho'}
            
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