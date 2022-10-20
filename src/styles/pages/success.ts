import { styled } from "..";

export const SuccessContainer = styled('main', {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 590,
    h1:{
        marginBottom: '4rem',
        color: '$gray100',
    },

    p:{
        marginBottom: '5rem',
        fontSize: '$xl',
        fontWeight: 'regular',
        textAlign: 'center',
        color: '$gray300',

        span:{
            fontWeight: 'bold',
        }
    },
    
    a:{
        fontSize: '$lg',
        color: '$green500',
        textDecoration: 'none',
    },
})

export const SuccessImgBox = styled('main', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    width: 127,
    height: 145,
    marginBottom: '2rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
})