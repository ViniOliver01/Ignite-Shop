import logoImg from "../assets/logo.svg"
import { Handbag } from 'phosphor-react';
import Link from "next/link";
import Image from 'next/future/image'
import { useShoppingCart } from "use-shopping-cart";

import CartModal from "./CartModal";

import * as Dialog from '@radix-ui/react-dialog';
import { BagCounter, BagIcon, HeaderContainer } from "../styles/components/header";
import { useEffect, useState } from "react";

export function Header(){
  const { cartCount } = useShoppingCart()
  const [itemAdd, setItemAdd] = useState(false)

  useEffect(()=>{
    setItemAdd(true)
    setTimeout(() => {
      setItemAdd(false)
    }, 2000)
    
  }, [cartCount])

  return (
    <HeaderContainer>
        <Link href={'/'}>
            <Image src={logoImg} alt="" />
          </Link>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <BagIcon className={itemAdd == true ? "shake" : ""}>
                <BagCounter>{cartCount}</BagCounter>
                <Handbag size={24} weight={'bold'}/>
                </BagIcon>
            </Dialog.Trigger>
            <CartModal />
          </Dialog.Root>
    </HeaderContainer>
  );
}