import Image from "next/future/image"
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";

import Stripe from "stripe";
import { stripe } from '../../lib/stripe';

import { 
        Button, 
        FormArea, 
        ImageBoxGradient, 
        Loading, 
        ProductContainer, 
        ProductDetails, 
        ProductDetailsDescription, 
        RadioArea, 
        RadioButtom,
        RadioIndicator,
      } from '../../styles/pages/product'
import { CheckCircle } from "phosphor-react";

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

const productSizeFormSchema = z.object({
  type: z.enum(['P','M','G','GG']),
})

type ProductSizeFormInputs = z.infer<typeof productSizeFormSchema>;

export default function Product({ product }: ProductProps){
  const { addItem } = useShoppingCart()
  const { isFallback } = useRouter()
  const [itemAdd, setItemAdd] = useState(false)

  const {
    control,
    handleSubmit, 
  } = useForm<ProductSizeFormInputs>({
        resolver: zodResolver(productSizeFormSchema),
      })

  function itemAddedToCart(){
    setItemAdd(true)
    setTimeout(() => {setItemAdd(false)}, 1500)
  }

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
    itemAddedToCart()
  }

  async function handleSelectProductSize(data: ProductSizeFormInputs){
    const {type} = data;
    console.log('aaa')
    console.log(type)
    handleAddToCart()
  }

  if (isFallback) { // Loading Skeleton
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
          
          <FormArea onSubmit={handleSubmit(handleSelectProductSize)}>
            <Controller
              control={control}
              name="type"
              render={({field})=> {
                return (
                  <RadioArea defaultValue=""
                    onValueChange={field.onChange} 
                    value={field.value}
                    >

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
                )
              }}
            />
            <Button 
            type="submit"
            disabled={itemAdd}
            >
              <div className={itemAdd ? "progressBar progressBarLoading" : "progressBar"} />
              {itemAdd ? <p>Adicionado <CheckCircle size={32} /></p> : <p>Adicionar ao carrinho</p>}
              
            </Button>
          </FormArea>
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