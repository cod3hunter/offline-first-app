import React from 'react';
import {Pressable} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../constants';

const Container = styled.View`
  flex-direction: row;
`;

const ButtonContainer = styled.View`
  overflow: hidden;
  border-radius: 32px;
  background-color: transparent;
  margin-right: 4px;
`;

const Button = styled(Pressable)`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 32px;
`;

const HeaderButton = ({onAddPress, onLogoutPress}) => (
  <Container>
    <ButtonContainer>
      <Button
        onPress={onAddPress}
        android_ripple={{borderless: false, color: COLORS.DARK}}>
        <Icon size={24} name="add" color="white" />
      </Button>
    </ButtonContainer>
    <ButtonContainer>
      <Button
        onPress={onLogoutPress}
        android_ripple={{borderless: false, color: COLORS.DARK}}>
        <Icon size={24} name="exit-to-app" color="white" />
      </Button>
    </ButtonContainer>
  </Container>
);

HeaderButton.propTypes = {
  onAddPress: PropTypes.func.isRequired,
  onLogoutPress: PropTypes.func.isRequired,
};

export default HeaderButton;
