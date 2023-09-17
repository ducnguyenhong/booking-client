import Slider from '@/components/slider';
import { PADDING_X } from '@/utils/const';
import { Box, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { FaStar } from 'react-icons/fa';
import 'react-multi-carousel/lib/styles.css';
import { CUSTOMER_REVIEW } from './customer.data';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 1599, min: 992 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 991, min: 577 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1
  }
};

const Customer = () => {
  return (
    <Box px={PADDING_X} py={{ xs: 10, lg: 20 }} bgColor="#FAFAFA">
      <Flex justify="center" gap={2.5} align="center">
        <Heading
          as="h3"
          fontSize={{ xs: 22, lg: 28 }}
          fontWeight={700}
          bgGradient="linear(to-l, #00b300, #006600)"
          bgClip="text"
        >
          Khách hàng nói về chúng tôi
        </Heading>
      </Flex>

      <Box mt={10}>
        <Slider
          responsive={responsive}
          itemShow={3}
          data={CUSTOMER_REVIEW}
          renderItem={(item, index) => {
            const { content, fullname, avatar } = item;
            return (
              <Flex
                bgColor="#FFF"
                key={fullname}
                boxShadow="base"
                borderRadius={10}
                overflow="hidden"
                direction="column"
                px={5}
                py={8}
                ml={index === 0 ? '1px' : 4}
                mr={4}
                h="99%"
              >
                <Flex direction="column" gap={2} justify="center" align="center">
                  <Image src={avatar} alt="customer" w={20} h={20} borderRadius="full" style={{ objectFit: 'cover' }} />
                  <Text fontWeight={600}>{fullname}</Text>
                  <Flex align="center" gap={1} justify="center">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Icon as={FaStar} color="#FFBF12" key={item} />
                    ))}
                  </Flex>
                  <Text fontStyle="italic" fontSize={15} textAlign="justify">
                    {content}
                  </Text>
                </Flex>
              </Flex>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(Customer);
