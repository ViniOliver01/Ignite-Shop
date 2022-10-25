import { 
    Content, 
    Overlay, 
    CartItem, 
    ImageBoxGradient, 
    ItemDetails, CartList, 
    Title, 
    Close, 
    Details, 
    Button,
} from "../styles/components/cartModal";
import { X } from 'phosphor-react';


import * as Dialog from '@radix-ui/react-dialog';
import Image from "next/future/image";

import { useShoppingCart } from 'use-shopping-cart'
import axios from "axios";

export default function CartModal(){
    const { 
            totalPrice, 
            cartCount, 
            cartDetails, 
            removeItem, 
        } = useShoppingCart()
        
    const cartDetailsKeys = (Object.keys(cartDetails));

    const productList = []
    cartDetailsKeys.map(key =>{
        productList.push({
            quantity: cartDetails[key].quantity, 
            price: Object.values(cartDetails[key].price_data)[0]
        })
    })

    async function handleRedirectToCheckout(){
        try {
            const response = await axios.post('/api/checkout', {
                productsArray: productList,
            })
            const { checkoutUrl } = response.data
            window.location.href = checkoutUrl
        } catch (error) {
            alert('Falha ao redirecionar')
            console.log(error)
        }
    }

    const formatedTotalPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency: 'BRL' 
    }).format((totalPrice)/100)
    
  return (
    <Dialog.Portal>
        <Overlay />
        <Content>
            <Close>
                <X size={24} weight={"bold"}/>
            </Close>
            <Title>Sacola de compras</Title>

            <CartList>
                {cartDetailsKeys.map(key =>{
                    return (
                        <CartItem key={cartDetails[key].id}>
                            <ImageBoxGradient>
                                <Image src={cartDetails[key].image} width={95} height={95} alt=""/>
                            </ImageBoxGradient>
                            <ItemDetails>
                                <p>{cartDetails[key].name}</p>
                                <p className="quantity">Quantidade: {cartDetails[key].quantity}</p>
                                <span>{cartDetails[key].formattedValue}</span>
                                <a onClick={() => removeItem(cartDetails[key].id)}>Remover</a>
                            </ItemDetails>
                        </CartItem>
                    )
                })}
                
            </CartList>

            <Details>
                <p>Quantidade</p>
                <span className="value">{cartCount} {cartCount == 1 ? 'item' : 'itens'}</span>
                <strong>Valor total</strong>
                <h2 className="value">{formatedTotalPrice}</h2> 
            </Details>
            <Button onClick={handleRedirectToCheckout} disabled={cartCount==0}>Finalizar compra</Button>
        </Content>
    </Dialog.Portal>
  );
}