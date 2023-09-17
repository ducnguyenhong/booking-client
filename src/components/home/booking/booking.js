import { Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { memo, useState } from 'react';
import BookingForm from './booking-form';
import { TAB_DATA } from './booking.data';

const Booking = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Flex w="full" h={{ xs: '510px', lg: '380px' }} pos="relative">
      <Image
        src="/images/background.png"
        priority
        fill
        quality={100}
        alt="background"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, objectFit: 'cover' }}
      />
      <Flex pos="absolute" top={0} left={0} zIndex={2} bgColor="#000" opacity={0.4} w="full" h="full" />

      <Flex
        pos="absolute"
        inset={0}
        zIndex={3}
        m="auto"
        bgColor="#FFF"
        w={{ xs: 9 / 10, lg: 3 / 5 }}
        h={{ xs: '95%', lg: '70%' }}
        borderRadius={10}
        boxShadow="md"
      >
        <Tabs w="full" colorScheme="yellow">
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
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default memo(Booking);
