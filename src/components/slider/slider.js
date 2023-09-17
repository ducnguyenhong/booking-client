import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import { memo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Carousel from 'react-multi-carousel';

const RESPONSIVE_DATA = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1599, min: 992 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 991, min: 577 },
    items: 2.5
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 2
  }
};

const Slider = (props) => {
  const { data = [], renderItem, responsive = RESPONSIVE_DATA, itemShow = 4 } = props;

  const ButtonGroup = (props) => {
    const { next, previous, goToSlide, dataCount, ...rest } = props;
    const {
      carouselState: { currentSlide }
    } = rest;
    const disablePrev = currentSlide === 0;
    const disableNext = currentSlide === data.length - itemShow;

    return (
      <Flex
        justify="space-between"
        pos="absolute"
        w="full"
        h="full"
        top={0}
        left={0}
        zIndex={5}
        display={{ xs: 'none', lg: 'flex' }}
      >
        <Button
          top={0}
          bottom={0}
          margin="auto 0"
          onClick={() => previous()}
          pos="relative"
          variant={disablePrev ? 'outline' : 'solid'}
          left={{ xs: -12, lg: -20 }}
          colorScheme="yellow"
          isDisabled={disablePrev}
          minW={0}
          minH={0}
          py={{ xs: 6, lg: 8 }}
          px={{ xs: 1.5, lg: 2 }}
        >
          <Icon as={FaChevronLeft} />
        </Button>
        <Button
          colorScheme="yellow"
          pos="relative"
          right={{ xs: -6, lg: -14 }}
          top={0}
          bottom={0}
          margin="auto 0"
          variant={disableNext ? 'outline' : 'solid'}
          onClick={() => next()}
          isDisabled={disableNext}
          minW={0}
          minH={0}
          py={{ xs: 6, lg: 8 }}
          px={{ xs: 1.5, lg: 2 }}
        >
          <Icon as={FaChevronRight} />
        </Button>
      </Flex>
    );
  };

  return (
    <Box pos="relative">
      <Carousel
        responsive={responsive}
        ssr={true}
        draggable={false}
        infinite={false}
        renderButtonGroupOutside
        arrows={false}
        autoPlay={false}
        customButtonGroup={<ButtonGroup />}
      >
        {data.map((item, index) => (
          <Box key={index} h="100%">
            {renderItem(item, index)}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default memo(Slider);
