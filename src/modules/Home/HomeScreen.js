import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getUsers } from './HomeService';
import UserCard from '../../library/UserCard';

const Container = styled(FlatList)`
  flex: 1;
  padding: 16px;
`;

export default function HomeScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers({ setUsers })
  }, []);

  return (
    <Container
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { first_name, last_name, status, gender, email } }) => (
        <UserCard 
          name={`${first_name} ${last_name}`}
          {...{ status, email, gender }}
        />
      )}
    />
  );
}
