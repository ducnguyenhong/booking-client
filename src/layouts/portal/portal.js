import { Loading } from '@/components';
import { PADDING_X } from '@/utils/const';
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const Portal = (props) => {
  const { isLoading, children, isNoData, error, title, breadcrumb } = props;

  const Wrapper = ({ children: wrapperChildren }) => {
    return (
      <Box px={PADDING_X} bgColor="#f5f5f5" pb={20}>
        <Flex align="center" gap={3} py={5}>
          <Link href="/">
            <Icon as={FaHome} fontSize={20} color="primary.2" mt={1.5} />
          </Link>
          <Icon as={FaChevronRight} fontSize={14} color="#9b9b9b" />
          <Text fontWeight={500}>{breadcrumb || title}</Text>
        </Flex>

        <Box bgColor="#FFF" borderRadius={5} pb={{ xs: 6, lg: 10 }} pt={{ xs: 6, lg: 12 }}>
          {!!title && (
            <Heading
              as="h3"
              py={3}
              fontSize={26}
              textAlign="center"
              bgGradient="linear(to-l, #0ef50a, #006600)"
              bgClip="text"
              mb={5}
            >
              {title}
            </Heading>
          )}
          <Box minH="400px" px={{ xs: 4, lg: 12 }}>
            {wrapperChildren}
          </Box>
        </Box>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  return <Wrapper>{children}</Wrapper>;
};

export default memo(Portal);
