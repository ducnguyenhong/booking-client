import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';
import BookingForm from './booking-form';

const Booking = () => {
  return (
    <Flex w="full" h={{ xs: '435px', lg: '400px' }} pos="relative">
      <Image
        src="/images/bg.jpg"
        priority
        fill
        quality={100}
        alt="background"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, objectFit: 'cover' }}
      />
      <Flex pos="absolute" top={0} left={0} zIndex={2} bgColor="#9b9b9b" opacity={0.1} w="full" h="full" />

      <Flex
        pos="absolute"
        inset={0}
        zIndex={3}
        m="auto"
        bgColor="#FFF"
        w={{ xs: 9 / 10, lg: 3 / 5 }}
        h={{ xs: '85%', lg: '55%' }}
        borderRadius={10}
        boxShadow="md"
        pt={5}
        px={3}
      >
        {/* <Tabs w="full" colorScheme="yellow">
          <TabList justifyContent="center" gap={5}>
            {TAB_DATA.map((item) => {
              const { tab, title, icon, iconSize } = item;
              const isActive = activeTab === tab;
              return (
                <Tab onClick={() => setActiveTab(tab)} key={title}>
                  <Flex align="center" gap={{ xs: 0.5, lg: 2 }} py={1} direction={{ xs: 'column', lg: 'row' }}>
                    <Icon as={icon} color={isActive ? 'primary.1' : 'text.1'} fontSize={iconSize} />
                    <Text as="span" color={isActive ? 'primary.1' : 'text.1'} fontWeight={isActive ? 600 : 500}>
                      {title}
                    </Text>
                  </Flex>
                </Tab>
              );
            })}
          </TabList>

          <TabPanels>
            <TabPanel>
              <BookingForm />
            </TabPanel>
            <TabPanel>
              <p>Tính năng sẽ được ra mắt trong phiên bản tiếp theo</p>
            </TabPanel>
          </TabPanels>
        </Tabs> */}
        <BookingForm />
      </Flex>
    </Flex>
  );
};

export default memo(Booking);
