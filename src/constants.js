import {Dimensions} from 'react-native';
import {GOREST_TOKEN} from '@env';

const {width, height} = Dimensions.get('window');

export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;

export const COLORS = {
  PRIMARY: '#512da8',
  LIGHT: '#8559da',
  DARK: '#140078',
};

export const API_TOKEN = GOREST_TOKEN;
