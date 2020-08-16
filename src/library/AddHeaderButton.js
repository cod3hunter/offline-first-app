import React from 'react';
import {Pressable} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../constants';

const Container = styled.View`
  overflow: hidden;
  border-radius: 32px;
  background-color: transparent;
  margin-left: 8px;
  margin-right: 8px;
`;

const Button = styled(Pressable)`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 32px;
`;

const AddHeaderButton = ({onPress}) => (
  <Container>
    <Button
      onPress={onPress}
      android_ripple={{borderless: false, color: COLORS.DARK}}>
      <Icon size={24} name="add" color="white" />
    </Button>
  </Container>
);

AddHeaderButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default AddHeaderButton;
