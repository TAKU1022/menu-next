import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { UserProvider } from '../components/context/user/UserProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          height: '100%',
          fontFamily:
            "'M PLUS Rounded 1c', Roboto, 'Helvetica Neue', sans-serif",
        },
        li: {
          listStyle: 'none',
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
