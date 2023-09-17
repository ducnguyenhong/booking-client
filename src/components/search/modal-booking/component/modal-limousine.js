import {
  Button,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';

const ModalLimousine = (props) => {
  const { show, onClose } = props;

  return (
    <Modal isCentered isOpen={show} onClose={onClose} size="xl" closeOnEsc closeOnOverlayClick>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign="center">Sơ đồ xe Limousine</Text>
        </ModalHeader>
        <Divider />
        <ModalBody py={10}>
          <Flex direction="column" gap={8}>
            <Flex align="center" gap={5}>
              <Flex flex={1 / 3} justify="center">
                <Icon as={GiSteeringWheel} fontSize={28} />
              </Flex>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-top.png" alt="top" width={30} height={30} />
              </Flex>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-top.png" alt="top" width={30} height={30} />
              </Flex>
            </Flex>

            <Flex align="center" gap={5}>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-center.png" alt="top" width={30} height={30} />
              </Flex>
              <Flex flex={1 / 3}></Flex>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-center.png" alt="top" width={30} height={30} />
              </Flex>
            </Flex>
            <Flex align="center" gap={5}>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-center.png" alt="top" width={30} height={30} />
              </Flex>
              <Flex flex={1 / 3}></Flex>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-center.png" alt="top" width={30} height={30} />
              </Flex>
            </Flex>
            <Flex align="center" gap={5}>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-center.png" alt="top" width={30} height={30} />
              </Flex>
              <Flex flex={1 / 3}></Flex>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-center.png" alt="top" width={30} height={30} />
              </Flex>
            </Flex>

            <Flex align="center" gap={5}>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-bottom.png" alt="top" width={30} height={30} />
              </Flex>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-bottom.png" alt="top" width={30} height={30} />
              </Flex>
              <Flex flex={1 / 3} justify="center">
                <Image src="/images/slot-bottom.png" alt="top" width={30} height={30} />
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <Divider />
        <ModalFooter justifyContent="center">
          <Button colorScheme="yellow" px={10} onClick={onClose}>
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ModalLimousine);
