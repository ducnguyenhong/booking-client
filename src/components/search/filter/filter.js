import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import FilterPrice from './subs/filter-price';
import FilterStop from './subs/filter-stop';

const Filter = () => {
  return (
    <Flex direction="column" gap={10} w="full" bgColor="#FFF" p={5} boxShadow="sm" borderRadius={5}>
      <FilterPrice />
      <FilterStop />
    </Flex>
  );
};

export default memo(Filter);
