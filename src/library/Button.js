import React from 'react';
import {Pressable, ViewPropTypes, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {COLORS} from '../constants';

const Container = styled.View(({style}) => ({
  overflow: 'hidden',
  'border-radius': '8px',
  'margin-top': '32px',
  width: '100%',
  ...style,
}));

const ButtonContainer = styled(Pressable)`
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

const Button = ({onPress, text, style, loading}) => (
  <Container {...{style}}>
    <ButtonContainer
      {...{onPress}}
      android_ripple={{color: COLORS.DARK, borderless: false}}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text>{text}</Text>
      )}
    </ButtonContainer>
  </Container>
);

Button.defaultProps = {
  text: '',
  style: {},
  loading: false,
};

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  loading: PropTypes.bool,
};

export default Button;
