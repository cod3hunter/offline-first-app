import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {COLORS} from '../constants';

const Container = styled.View`
  overflow: hidden;
  border-radius: 8px;
  margin-top: 32px;
  width: 100%;
`;

const Button = styled(Pressable)`
  border-radius: 8px;
  background-color: ${COLORS.PRIMARY};
  elevation: 3;
  width: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Arial, Helvetica, sans-serif';
`;

const SubmitButton = ({onPress, text}) => (
  <Container>
    <Button
      {...{onPress}}
      android_ripple={{color: COLORS.DARK, borderless: false}}>
      <Text>{text}</Text>
    </Button>
  </Container>
);

SubmitButton.defaultProps = {
  text: '',
};

SubmitButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export default SubmitButton;
