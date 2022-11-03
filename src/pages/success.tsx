import { SuccessContainer, SuccessImgBox, SuccessProductList } from "../styles/pages/success";
import Image from "next/future/image";
import Link from 'next/link'
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Head from "next/head";

interface SuccessProps{
  customerName: string;
  productList: [
    {
      name: string,
      imgUrl: string,
    }
  ]
  productCount: number;
}

export default function success({customerName, productList, productCount}: SuccessProps){
  console.log(productList)
  return (
    <>
      <Head>
        <title>Success</title>
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <SuccessProductList>
           {productList.map(item => {
            return( 
              <SuccessImgBox key={item.name}>
                <Image src={item.imgUrl} alt="Erro" height={130} width={130}/> 
              </SuccessImgBox>
             )
           })}
        </SuccessProductList>
        <p>Uhuul <span>{customerName}</span>, sua compra de <span>{productCount}</span> {productCount==1? 'camiseta' : 'camisetas'} já está a caminho da sua casa. </p>
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
  const productList = []
  let productCount = 0
  
  let index = 0;
  while (index < session.line_items.data.length) {
    const product = session.line_items.data[index].price.product as Stripe.Product
    productCount = session.line_items.data[index].quantity + productCount
    productList.push({
      name: product.name,
      imgUrl: product.images[0]
    })
    index++
  }

  return{ 
    props:{
      customerName,
      productList,
      productCount,
    }
  }
}