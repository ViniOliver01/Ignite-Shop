import Image from "next/future/image"

import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from './../styles/pages/home'
import 'keen-slider/keen-slider.min.css'

import shirt_1 from "../assets/shirt/Variant6.png"
import shirt_2 from "../assets/shirt/Variant7.png"
import shirt_3 from "../assets/shirt/Variant8.png"
import shirt_4 from "../assets/shirt/Variant9.png"

export default function Home(){
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
      
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt_1} width={520} height={480} alt=""/>
        <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={shirt_2} width={520} height={480} alt=""/>
        <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={shirt_3} width={520} height={480} alt=""/>
        <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={shirt_4} width={520} height={480} alt=""/>
        <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}