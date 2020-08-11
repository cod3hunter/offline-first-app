import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
`;

const LoadingIndicator = () => (
  <Container>
    <ActivityIndicator size="large" color="black" />
  </Container>
);

export default LoadingIndicator;
