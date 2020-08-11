import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { fillUserList } from './HomeService';
import UserCard from '../../library/UserCard';
import FloatButton from '../../library/FloatButton';
import LoadingIndicator from '../../library/LoadingIndicator';

const Container = styled.View`
  flex: 1;
`;

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fillUserList({ setUsers, setIsLoading })
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 88, }}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { first_name, last_name, status, gender, email, id } }) => (
          <UserCard 
            name={`${first_name} ${last_name}`}
            onPress={() => console.log('open modal')}
            {...{ status, email, gender }}
          />
        )}
      />
      <FloatButton
        onPress={() => console.log('onPress')}
      />
    </Container>
  );
}
