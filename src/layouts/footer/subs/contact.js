import { Link as ChakraLink, Flex, Icon, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { FaEnvelope, FaFacebook, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const SOCIAL_MEDIA_DATA = [
    {
      icon: FaFacebook,
      title: 'Facebook',
      href: 'https://www.facebook.com/vantai84GO'
    }
    // {
    //   icon: FaYoutube,
    //   title: 'Youtube',
    //   href: '/'
    // },
    // {
    //   icon: FaInstagram,
    //   title: 'Instagram',
    //   href: '/'
    // },
    // {
    //   icon: FaTwitter,
    //   title: 'Twitter',
    //   href: '/'
    // }
  ];

  const CONTACT_DATA = [
    {
      icon: FaPhone,
      title: '1900 633360',
      href: 'tel:1900633360',
      isExternal: false
    },
    {
      icon: FaEnvelope,
      title: 'vantaithuongmai.84go@gmail.com',
      href: 'mailto:vantaithuongmai.84go@gmail.com',
      isExternal: false
    },
    {
      icon: FaMapMarkerAlt,
      title: '27, 344/8 Ngọc Thuỵ, Long Biên, Hà Nội',
      href: 'https://www.google.com/maps/place/8+Ng.+344+%C4%90.+Ng%E1%BB%8Dc+Th%E1%BB%A5y,+Ng%E1%BB%8Dc+Th%E1%BB%A5y,+Long+Bi%C3%AAn,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0602687,105.8617983,17z/data=!4m6!3m5!1s0x3135aa2e270a30ef:0x3310272141225310!8m2!3d21.0602637!4d105.8643732!16s%2Fg%2F11pyj1zddd?entry=ttu',
      isExternal: true
    }
  ];

  return (
    <Flex flex={1 / 4} direction="column">
      <Text fontWeight={700} fontSize={{ xs: 18, lg: 22 }}>
        Liên hệ
      </Text>
      <Flex direction="column" mt={5} gap={1.5}>
        {CONTACT_DATA.map((item) => {
          const { title, icon, isExternal, href } = item;
          return (
            <Flex align="center" gap={2} key={title}>
              <Icon as={icon} fontSize={14} color="text.2" />
              <ChakraLink href={href} fontWeight={500} color="text.2" fontSize={15} isExternal={isExternal}>
                {title}
              </ChakraLink>
            </Flex>
          );
        })}
      </Flex>
      <Flex align="center" gap={3} mt={3}>
        {SOCIAL_MEDIA_DATA.map((item) => {
          const { icon, title, href } = item;
          return (
            <ChakraLink href={href} key={title} isExternal>
              <Flex borderRadius="full" w={9} h={9} bgColor="primary.2" justify="center" align="center" data-group>
                <Icon
                  as={icon}
                  color="#FFF"
                  fontSize={18}
                  _groupHover={{ transform: 'scale(1.1)' }}
                  transitionDuration="250ms"
                />
              </Flex>
            </ChakraLink>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default memo(Contact);
