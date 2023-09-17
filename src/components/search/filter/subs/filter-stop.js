import { Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { memo } from 'react';

const FilterStop = () => {
  const FILTER_STOP = [
    {
      label: '1 điểm đón/trả',
      value: '1'
    },
    {
      label: 'Nhiều điểm đón trả',
      value: '2'
    }
  ];

  return (
    <Flex direction="column" gap={3}>
      <Text fontSize={18} fontWeight={600}>
        Điểm đón trả
      </Text>
      <Flex align="center" gap={2}>
        <RadioGroup defaultValue="1">
          <Flex direction="column" gap={3}>
            {FILTER_STOP.map((item) => {
              const { label, value } = item;
              return (
                <Radio key={value} colorScheme="yellow" value={value}>
                  {label}
                </Radio>
              );
            })}
          </Flex>
        </RadioGroup>
      </Flex>
    </Flex>
  );
};

export default memo(FilterStop);
