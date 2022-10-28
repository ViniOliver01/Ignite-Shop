import { styled } from "..";
import * as RadioGroup from '@radix-ui/react-radio-group';

export const ProductContainer = styled('main', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: '0 auto',
    alignItems: 'stretch',
    maxWidth: 1180,
    gap: '4.5rem',
})

export const ImageBoxGradient = styled('div', {
    width: '100%',
    height: 'calc(656px - 0.5rem)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

    img: {
        objectFit: 'cover',
    }
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',
})

export const ProductDetailsDescription = styled('div', {
    h1: {
        marginBottom: '1rem',
        color: '$gray300',
        fontSize: '$2xl',
    },
    span: {
        color: '$green300',
        fontSize: '$2xl',
    },
    p: {
        marginTop: '2.5rem',
        fontSize: '$md',
        lineHeight: 1.6,
        color: '$gray300',
    },
})

export const Button = styled('button', {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',

    width: '100%',
    height: 70,
    marginTop: 'auto',

    background: '$green500',
    color: '$white',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',

    fontSize: '$md',
    fontWeight: 'bold',
    transition: 'background, 0.3s',

    p:{
        display: "flex",
        alignItems: "center",
        height: "100%",
        transition: '2s'
    },
})

export const Loading = styled('button', {
    
})

export const FormArea = styled('form', {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    height: '100%',
})

export const RadioArea = styled(RadioGroup.Root, {
    marginTop: 32,
    display: 'flex',
    gap: 30,
})

export const RadioButtom = styled(RadioGroup.Item, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$gray700",
    width: 60,
    height: 60,
    borderRadius: "50%",
    cursor: 'pointer',
    
    '&:disabled': {
        opacity: 0.3,
        cursor: 'not-allowed',
    },
    
    p:{
        fontSize: '$lg',
        position: "absolute", 
        color: '$white',
    },

})

export const RadioIndicator = styled(RadioGroup.Indicator, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",

    color: '$gray800',
    fontSize: '$sm',
    
    "&::after": {
        content: '""',
        display: "block",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor: "$green500",
        opacity: 1,
    }
})