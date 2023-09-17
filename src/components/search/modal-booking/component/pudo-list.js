import { formatCurrency } from '@/utils/helper';
import { Box, Flex, Icon, Text, Textarea } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { fromTransitNoteAtom, toTransitNoteAtom } from '../modal-booking.recoil';

const getSeatTypeLabel = (seatType) => {
  if (seatType === 'dau') {
    return 'Đầu';
  }
  if (seatType === 'giua') {
    return 'Giữa';
  }
  if (seatType === 'cuoi') {
    return 'Cuối';
  }
  if (seatType === 'cabindon') {
    return 'Cabin đơn';
  }
  if (seatType === 'cabindoi') {
    return 'Cabin đôi';
  }
  return 'Giá vé';
};

const PUDOList = (props) => {
  const { data, currentStop, onChange, isFrom, isTo, transitPrices } = props;
  const [fromTransitNote, setFromTransitNote] = useRecoilState(fromTransitNoteAtom);
  const [toTransitNote, setToTransitNote] = useRecoilState(toTransitNoteAtom);

  const valueNote = useMemo(() => {
    if (isFrom) {
      return fromTransitNote;
    }
    if (isTo) {
      return toTransitNote;
    }
    return '';
  }, [fromTransitNote, isFrom, isTo, toTransitNote]);

  return (
    <Flex direction="column" gap={{ xs: 3, lg: 5 }}>
      {data.map((item) => {
        const { id, name, canNote, type } = item;
        const isActive = id === currentStop;
        return (
          <Box key={id}>
            <Flex
              gap={3}
              cursor="pointer"
              onClick={() => {
                isFrom && setFromTransitNote('');
                isTo && setToTransitNote('');
                onChange({ id, name, type });
              }}
            >
              <Icon
                as={isActive ? MdRadioButtonChecked : MdRadioButtonUnchecked}
                fontSize={24}
                color={isActive ? 'primary.1' : '#CCC'}
              />
              <Box>
                {/* <Text fontWeight={600}>15:00</Text> */}
                <Text fontWeight={400} fontSize={14}>
                  {name} {type === 'diemtrungchuyen' && '(Điểm trung chuyển)'}
                </Text>
                {!!transitPrices && type === 'diemtrungchuyen' && isActive && (
                  <Text fontSize={13} color="text.2">
                    (
                    {transitPrices
                      .map((i) => `${getSeatTypeLabel(i.seatType)}: ${formatCurrency(i.price)}`)
                      .join(' - ')}
                    )
                  </Text>
                )}
                {/* <Text fontSize={14} color="text.2">
                số 3 Cầu Giấy
              </Text> */}
              </Box>
            </Flex>

            {isActive && canNote && (
              <Textarea
                mt={3}
                fontSize={14}
                rows={2}
                placeholder="Nhập chi tiết địa điểm"
                value={valueNote}
                onChange={(e) => {
                  if (isFrom) {
                    setFromTransitNote(e.target.value);
                  }
                  if (isTo) {
                    setToTransitNote(e.target.value);
                  }
                }}
              />
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default memo(PUDOList);
