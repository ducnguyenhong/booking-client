import { extendTheme } from '@chakra-ui/react';

const BreakpointConfig = {
  breakpoints: {
    xs: '320px', // mobile
    sm: '480px',
    md: '768px', // tablet
    lg: '1050px',
    xl: '1280px', // desktop
    '2xl': '1600px'
  }
};

const ColorConfig = {
  colors: {
    primary: { 1: '#FFD700', 2: '#e6c300' },
    text: { 1: '#4f4f4f', 2: '#828282', 3: '#595959' },
    link: { 1: '#3182CE', 2: '#2B6CB0' }
  }
};

const FontConfig = {
  fonts: {}
};

export const chakraTheme = extendTheme({
  // ...ComponentsTheme,
  ...FontConfig,
  ...ColorConfig,
  ...BreakpointConfig
  // ...MiscConfig,
  // ...GlobalConfig
});
