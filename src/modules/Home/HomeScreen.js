import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { fillUserList } from './HomeService';
import UserCard from '../../library/UserCard';

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const UserList = styled(FlatList)`
  flex: 1;
`;

export default function HomeScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fillUserList({ setUsers })
  }, []);

  return (
    <Container>
      <UserList
        data={users}
        contentContainerStyle={{ paddingBottom: 32 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { first_name, last_name, status, gender, email } }) => (
          <UserCard 
            name={`${first_name} ${last_name}`}
            {...{ status, email, gender }}
          />
        )}
      />
    </Container>
  );
}
