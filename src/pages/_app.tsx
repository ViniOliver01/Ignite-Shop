import { AppProps } from "next/app"

import {Container} from './../styles/pages/app';
import { globalStyles } from "./../styles/global"

import { CartProvider } from 'use-shopping-cart'
import { Header } from "../components/Header";

const stripeKey = process.env.STRIPE_PUBLIC_KEY

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl="stripe.com"
      cancelUrl="twitter.com/dayhaysoos"
      currency="BRL"
      allowedCountries={['US', 'BR', 'CA']}
      billingAddressCollection={true}
    >
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}