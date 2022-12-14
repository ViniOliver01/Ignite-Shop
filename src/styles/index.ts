import { createStitches } from '@stitches/react'

export const {
    config, 
    styled, 
    css, 
    globalCss, 
    keyframes, 
    getCssText, 
    theme, 
    createTheme
} = createStitches({
    theme: {
        colors: {
            white: '#fff',
            gray900: '#121214',
            gray800: '#28282c',
            gray700: '#2e2e33',
            gray500: '#8D8D99',
            gray300: '#c4c4cc',
            gray100: '#e1e1e6',

            green500: '#00875f',
            green300: '#00b37e'
        },
        fontSizes: {
            sm: '1rem', //16
            md: '1.125rem', //18
            lg: '1.25rem', //20
            xl: '1.5rem', //24
            '2xl': '2rem' //32
        }
    }
})