import { Box, Flex, Text } from '@chakra-ui/react';
import { Divider } from 'antd';
import { memo } from 'react';
import AboutUs from './subs/about-us';
import Contact from './subs/contact';
import MobileApp from './subs/mobile-app';
import Support from './subs/support';

const Footer = () => {
  return (
    <Box mt={{ xs: 8, lg: 16 }} py={8} bgColor="#212020">
      <Flex
        mb={{ xs: 10, lg: 24 }}
        px={{ xs: 5, md: 20, lg: 0 }}
        pl={{ xs: 5, lg: '100px', '2xl': '150px' }}
        pr={{ xs: 0, lg: '100px', '2xl': '120px' }}
        gap={{ xs: 10, lg: 0 }}
        direction={{ xs: 'column', lg: 'row' }}
      >
        <AboutUs />
        <MobileApp />
        <Support />
        <Contact />
      </Flex>
      <Divider />
      <Box mt={{ xs: 0, lg: 5 }} px={{ xs: 5, lg: '180px', '2xl': '250px' }}>
        <Text fontWeight={500} color="#FFF" textAlign="center" fontSize={{ xs: 14, lg: 16 }}>
          © Copyright 2023 - Bản quyền thuộc về{' '}
          <Text as="span" color="primary.1">
            BOOKING
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default memo(Footer);
