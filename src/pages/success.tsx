import { SuccessContainer, SuccessImgBox } from "../styles/pages/success";
import shirtImg from '../assets/shirt/Variant6.png'
import Image from "next/future/image";
import Link from 'next/link'

export default function success(){

  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <SuccessImgBox>
        {/* <Image src={shirtImg} alt="Erro" height={106}/>  */}
      </SuccessImgBox>
      <p>Uhuul <span>Diego Fernandes</span>, sua <span>Camiseta Beyond the Limits</span> já está a caminho da sua casa. </p>
      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  );
}