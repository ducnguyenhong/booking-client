import { Flex, Icon, Link } from '@chakra-ui/react';
import { memo } from 'react';
import { FaPhone } from 'react-icons/fa';

const ButtonPhone = () => {
  return (
    <Link display="block" href="tel:1900633360" className="phone-84-go-contact">
      <Flex align="center" justify="center" className="phone-84-go-trigger">
        <Icon as={FaPhone} fontSize={20} />
      </Flex>
    </Link>
  );
};

export default memo(ButtonPhone);
