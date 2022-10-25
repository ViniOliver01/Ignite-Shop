import { styled } from '..';
import * as Dialog from '@radix-ui/react-dialog';

export const Overlay = styled(Dialog.Overlay, {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.75)',
})

export const Content = styled(Dialog.Content, {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 480,
    height: '100vh',
    paddingInline: '2.5rem',
    paddingTop: '1.5rem',
    paddingBottom: '2.5rem',
    background: '$gray800',
    
    position: 'fixed',
    top: '0%',
    right: '0%',
})

export const Close = styled(Dialog.Close, {
    position: 'absolute',
    background: 'transparent',
    border: 0,
    top: '1.5rem',
    right: '1.5rem',
    lineHeight: 0,
    cursor: 'pointer',
    color: '$gray500',
})

export const Title = styled(Dialog.Title, {
    marginTop: '1.5rem',
})

export const CartItem = styled('div', {
    display: 'flex',
    gap: 20,
})

export const CartList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: '1.5rem',

    marginTop: '2rem',
    height: 'auto',
})

export const ItemDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    span:{
        fontWeight: 'bold',
    },
    '.quantity':{
        fontSize: 14,
        color: '$gray500',
    },
    a:{
        fontSize: '$sm',
        textDecorationLine: 'none',
        fontWeight: 'bold',
        color: '$green500',
        cursor: 'pointer',
    },
    'a:hover':{
        color: '$green300',
    }

})

export const ImageBoxGradient = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    width: 100,
    height: 100,
    borderRadius: 8,
})

export const Details = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    rowGap: '0.5rem',

    span:{
        fontSize: '$md',
    },

    strong:{
        fontSize: '$md',
        fontWeight: 'bold',
    },

    '.value':{
        textAlign: 'end',
    },
})

export const Button = styled('button', {
    marginTop: 55,
    background: '$green500',
    borderRadius: 8,
    padding: 20,
    border: 'none',
    width: '100%',
    cursor: 'pointer',

    position: 'relative',

    color: '$white',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:not(:disabled):hover':{
        background: '$green300',
    },
    '&:disabled':{
        opacity: 0.3,
        cursor: 'not-allowed',
    },
})