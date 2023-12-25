import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 12.972358;
const LONGITUDE = 77.594619;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const BlrCoords = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export function randomColorWithOpacity(opacity) {
  const randomHex = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  const alpha = Math.min(Math.max(opacity || 1, 0), 1); // Ensure alpha is between 0 and 1
  return `rgba(${parseInt(randomHex.slice(0, 2), 16)}, ${parseInt(
    randomHex.slice(2, 4),
    16,
  )}, ${parseInt(randomHex.slice(4, 6), 16)}, ${alpha})`;
}
