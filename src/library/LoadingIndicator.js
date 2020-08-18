import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import BasicContainer from './BasicContainer';
import {COLORS} from '../constants';

const LoadingContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LoadingIndicator = () => (
  <BasicContainer>
    <LoadingContainer>
      <ActivityIndicator size="large" color={COLORS.DARK} />
    </LoadingContainer>
  </BasicContainer>
);

export default LoadingIndicator;
