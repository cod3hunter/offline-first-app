import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  border-radius: 56px;
  overflow: hidden;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const FloatingButton = styled(Pressable)`
  background-color: black;
  elevation: 3;
  width: 56px;
  height: 56px;
  padding: 16px;
  border-radius: 56px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 24px;
  color: white;
`;

const FloatButton = ({ text, onPress }) => (
  <Container>
    <FloatingButton
      android_ripple={{ borderless: false, color: 'gray' }}
      onPress={onPress}  
    >
      <Text>
        { text }
      </Text>
    </FloatingButton>
  </Container>
);

FloatButton.defaultProps = {
  text: '+',
};

FloatButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default FloatButton;
