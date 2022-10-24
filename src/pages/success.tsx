import { SuccessContainer, SuccessImgBox } from "../styles/pages/success";
import shirtImg from '../assets/shirt/Variant6.png'
import Image from "next/future/image";
import Link from 'next/link'
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Product from './product/[id]';
import Stripe from "stripe";
import Head from 'next/head';

interface SuccessProps{
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function success({customerName, product}: SuccessProps){

  return (
    <>
      <head>
        <title>Success</title>
      </head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <SuccessImgBox>
          <Image src={product.imageUrl} alt="Erro" height={110} width={120}/> 
        </SuccessImgBox>
        <p>Uhuul <span>{customerName}</span>, sua <span>{product.name}</span> já está a caminho da sua casa. </p>
        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =async ({ query }) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product

  return{ 
    props:{
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      }
    }
  }
}