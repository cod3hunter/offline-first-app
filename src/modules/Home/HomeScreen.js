import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {fillUserList} from './HomeService';
import UserCard from '../../library/UserCard';
import LoadingIndicator from '../../library/LoadingIndicator';
import EmptyState from '../../library/EmptyState';
import BasicContainer from '../../library/BasicContainer';

const ErrorText = styled.Text`
  font-weight: bold;
  color: red;
  width: 100%;
  text-align: center;
`;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 16,
  },
});

const HomeScreen = ({navigation}) => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    fillUserList({dispatch});
  }, [dispatch]);

  if (users.loading) {
    return <LoadingIndicator />;
  }

  return (
    <BasicContainer>
      <FlatList
        data={users.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item) => item.id}
        renderItem={({item: {name, gender, email, id}}) => (
          <UserCard
            onPress={() => navigation.navigate('User', {id})}
            {...{email, gender, name}}
          />
        )}
        ListHeaderComponent={() =>
          users.error && <ErrorText>Error trying to get users</ErrorText>
        }
        ListEmptyComponent={EmptyState}
      />
    </BasicContainer>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
