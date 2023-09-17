import { FormLabel, Text } from '@chakra-ui/react';
import { memo } from 'react';

const FieldLabel = (props) => {
  const { title, isRequired } = props;
  return (
    <FormLabel fontWeight={600}>
      {title}{' '}
      {isRequired && (
        <Text as="span" color="red">
          *
        </Text>
      )}
    </FormLabel>
  );
};

export default memo(FieldLabel);
