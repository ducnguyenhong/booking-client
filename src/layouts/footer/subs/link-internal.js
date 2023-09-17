import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';

const LinkInternal = (props) => {
  const { href, title } = props;

  return (
    <Link href={href}>
      <Text
        as="span"
        fontWeight={500}
        color="text.3"
        fontSize={{ xs: 14, lg: 16 }}
        _hover={{ color: 'primary.1', fontWeight: 600 }}
        transitionDuration="200ms"
      >
        {title}
      </Text>
    </Link>
  );
};

export default memo(LinkInternal);
