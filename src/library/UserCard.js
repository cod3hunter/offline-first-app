import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  overflow: hidden;
  border-radius: 8px;
  margin-top: 16px;
`;

const Card = styled.TouchableOpacity`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  padding-top: 24px;
  background-color: white;
  border-radius: 8px;
  elevation: 1;
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

const ActiveIndicator = styled.View`
  height: 15px;
  width: 15px;
  background-color: ${({ status }) => status === 'active' ? 'green' : 'yellow'};
  border-radius: 4px;
`;

const DescriptionContainer = styled.View`
  margin-top: 16px;
`;

const DescriptionText = styled.Text`
  font-family: 'Arial, Helvetica, sans-serif';
  font-size: 13px;
`;

const UserCard = ({ name, email, status, gender, onPress }) => (
  <Container>
    <Card 
      onPress={onPress} android_ripple={{ borderless: false, color: '#f1f1f1' }} >
      <TopContainer>
        <Name>
          { name }
        </Name>
        <ActiveIndicator status={status} />
      </TopContainer>
      <DescriptionContainer>
        <DescriptionText>
          Gender: { gender }
        </DescriptionText>
        <DescriptionText>
          E-mail: { email }
        </DescriptionText>
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
  status: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  gender: PropTypes.string,
};

export default UserCard;
