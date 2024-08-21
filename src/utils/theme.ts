import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config,
  components: {
    Button: {
      variants: {
        solid: {
          color: 'gray.800',
          _dark: {
            bg: 'gray.100',
            color: 'gray.800',
            fill: 'gray.800',
          },
        },
      },
    },
  },
 })
export default theme