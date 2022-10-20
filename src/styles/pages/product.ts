import { styled } from "..";

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
    width: '100%',
    height: 70,
    marginTop: 'auto',
    padding: '1.25rem',

    background: '$green500',
    color: '$white',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',

    fontSize: '$md',
    fontWeight: 'bold',
    transition: 'background, 0.3s',

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
        background: '$green300',
    }
})

export const Loading = styled('button', {
    
})

