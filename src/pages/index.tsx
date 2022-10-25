import Image from "next/future/image"
import { stripe } from './../lib/stripe';
import Stripe from "stripe";
import { GetStaticProps } from "next"
import { useKeenSlider } from 'keen-slider/react'
import Link from 'next/link'
import Head from 'next/head'

import 'keen-slider/keen-slider.min.css'
import { HomeContainer, HomeProductDetails, IconBox, Product } from './../styles/pages/home'
import { Handbag } from "phosphor-react";

interface HomeProps {
  products:{
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps){
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })
  console.log(products)

  return (
    <>
    <Head>
      <title>Ignite Shop</title>
    </Head>
    
      <HomeContainer ref={sliderRef} className="keen-slider">
        <Head>
          <title>Ignite Shop</title>
        </Head>

        {products.map(product => {
          return (
            <Link 
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
                <footer>
                    <HomeProductDetails>
                      <strong>{product.name}</strong>
                      <span>{new Intl.NumberFormat('pt-BR', {
                              style: 'currency', 
                              currency: 'BRL' 
                              }).format((product.price)/100)}</span>
                    </HomeProductDetails>
                    <IconBox>
                      <Handbag size={32} weight={'bold'}/>
                    </IconBox>
                </footer>
                
              </Product>
            </Link>
          )
        })
      }
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async() => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product =>{
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    }
  })
  

  return {
    props: {
      products
    },
    revalidate: 60*60*2, // 2 Hours
  }
}