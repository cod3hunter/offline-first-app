import React from 'react';
import styled from 'styled-components/native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants';

const Container = styled.View`
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  font-family: 'Arial, Helvetica, sans-serif';
  text-align: center;
  font-weight: 300;
`;

const EmptyState = () => (
  <Container>
    <EmptyText>
      Não há usuários disponíveis
    </EmptyText>
  </Container>
);

export default EmptyState;
