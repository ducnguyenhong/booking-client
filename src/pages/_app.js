import { ButtonMessenger, ButtonPhone, ButtonZalo } from '@/components/button-contact';
import ModalForgotPass from '@/components/modal-forgot-pass';
import ModalLogin from '@/components/modal-login';
import ModalRegister from '@/components/modal-register';
import { chakraTheme } from '@/config/chakra-theme';
import { Footer } from '@/layouts';
import { useQueryUserInfo } from '@/queries/user.query';
import '@/styles/globals.css';
import { CK_TOKEN } from '@/utils/const';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiProvider } from '@ultra-ui/api';
import 'dayjs/locale/vi';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { Roboto } from 'next/font/google';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';

const Menu = dynamic(() => import('@/layouts/menu'), { ssr: false });
const quicksand = Roboto({ subsets: ['latin', 'vietnamese'], weight: ['100', '300', '400', '500', '700', '900'] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const MainLayout = ({ Component, pageProps }) => {
  const { isLoading } = useQueryUserInfo();
  const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return null;
  // }

  // if (isLoading) {
  //   return (
  //     <Flex w="100%" h="100vh" justify="center" align="center">
  //       <Loading />
  //     </Flex>
  //   );
  // }

  return (
    <div>
      <Menu />
      <Box mt={'65px'}>
        <Component {...pageProps} />
      </Box>
      <Footer />
      <ModalLogin />
      <ModalRegister />
      <ModalForgotPass />

      <ButtonPhone />
      <ButtonZalo />
      <ButtonMessenger />
    </div>
  );
};

function MyApp({ Component, pageProps }) {
  const token = Cookies.get(CK_TOKEN);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ApiProvider config={{ token }}>
            <ChakraProvider theme={chakraTheme}>
              <div className={quicksand.className}>
                <MainLayout Component={Component} pageProps={pageProps} />
              </div>
            </ChakraProvider>
          </ApiProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
