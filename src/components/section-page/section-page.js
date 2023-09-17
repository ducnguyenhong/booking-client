import { PADDING_X } from '@/utils/const';
import { Flex, Heading } from '@chakra-ui/react';
import { memo } from 'react';

const SectionPage = (props) => {
  const { title } = props;
  return (
    <Flex
      align="center"
      h={{ xs: '80px', lg: '120px', '2xl': '150px' }}
      px={PADDING_X}
      bgGradient="linear(to-l, #0bc408, #077a05)"
    >
      <Heading as="h2" fontSize={{ xs: 18, lg: 24 }} fontWeight={600} color="#FFF">
        {title}
      </Heading>
    </Flex>
  );
};

export default memo(SectionPage);
