import { Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { memo } from 'react';

const FilterPrice = () => {
  const FILTER_PRICE = [
    {
      label: 'Dưới 200.000đ',
      value: '0-200000'
    },
    {
      label: '200.000đ - 300.000đ',
      value: '200000-300000'
    },
    {
      label: '300.000đ - 500.000đ',
      value: '300000-500000'
    },
    {
      label: '500.000đ - 1.000.000đ',
      value: '500000-1000000'
    }
  ];

  return (
    <Flex direction="column" gap={3}>
      <Text fontSize={18} fontWeight={600}>
        Khoảng giá
      </Text>
      <Flex align="center" gap={2}>
        <RadioGroup defaultValue="0-200000">
          <Flex direction="column" gap={3}>
            {FILTER_PRICE.map((item) => {
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

export default memo(FilterPrice);
