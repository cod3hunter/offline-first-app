import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  padding-top: 24px;
  margin-top: 16px;
  background-color: white;
  border-radius: 8px;
  elevation: 1;
`;

const TopContainer = styled.View`
  flex: 1;
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

export default function UserCard({ name, email, status, gender }) {
  return (
    <Container activeOpacity={0.8} onPress={() => console.warn('teste')}>
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
    </Container>
  );
};
