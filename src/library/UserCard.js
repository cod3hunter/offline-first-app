import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {COLORS} from '../constants';

const Container = styled.View`
  overflow: hidden;
  border-radius: 8px;
  margin-top: 16px;
`;

const Card = styled(Pressable)`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  padding-top: 24px;
  background-color: white;
  border-radius: 8px;
  elevation: 3;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 1);
`;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.Text`
  font-family: 'Arial, Helvetica, sans-serif';
  font-size: 16px;
  font-weight: bold;
`;

const DescriptionContainer = styled.View`
  margin-top: 16px;
`;

const DescriptionText = styled.Text`
  font-family: 'Arial, Helvetica, sans-serif';
  font-size: 13px;
`;

const UserCard = ({name, email, gender, onPress}) => (
  <Container>
    <Card
      onPress={onPress}
      android_ripple={{borderless: false, color: COLORS.DARK}}>
      <TopContainer>
        <Name>{name}</Name>
      </TopContainer>
      <DescriptionContainer>
        <DescriptionText>Gender: {gender}</DescriptionText>
        <DescriptionText>E-mail: {email}</DescriptionText>
      </DescriptionContainer>
    </Card>
  </Container>
);

UserCard.defaultProps = {
  gender: '',
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  gender: PropTypes.string,
};

export default UserCard;
