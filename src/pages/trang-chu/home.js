import Head from '@/components/head/head';
import { Customer, NewsList, PromotionList, RouteList } from '@/components/home';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Booking = dynamic(() => import('@/components/home/booking'), { ssr: false });

const Home = () => {
  return (
    <Box>
      <Head />
      <Booking />
      <RouteList />
      <PromotionList />
      <NewsList />
      <Customer />
    </Box>
  );
};

export default Home;
