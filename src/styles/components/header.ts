import { keyframes, styled } from "..";

const scaleUp = keyframes({
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.5)' },
    '75%': { transform: 'scale(1.5)' },
    '100%': { transform: 'scale(1)' },
})

export const HeaderContainer = styled('header', {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    '.shake': {
        animation: `${scaleUp} 1300ms`,
        animationFillMode: 'both',
    }
})

export const BagIcon = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '$gray800',
    padding: '0.75rem',
    borderRadius: 6,

    cursor: 'pointer',

    width: 48,
    height: 48,
})

export const BagCounter = styled('div', {
    background: '$green300',
    width: 32,
    height: 32,
    borderRadius: '50%',
    position: 'absolute',
    transform: 'translate(80%, -80%)',
    border: '4px solid $gray900',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 14,
})