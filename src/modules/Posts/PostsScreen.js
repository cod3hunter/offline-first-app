import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {findPosts, goToPost} from './PostsService';
import {postListSelector} from '../../store/ducks/PostsDuck';
import {userIdSelector} from '../../store/ducks/UserDuck';
import {
  BasicContainer,
  EmptyState,
  LoadingIndicator,
  PostCard,
  ErrorText,
} from '../../library/';

const PostList = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    paddingBotton: 16,
  },
}))``;

const HomeScreen = ({navigation}) => {
  const data = useSelector(postListSelector);
  const userId = useSelector(userIdSelector);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    findPosts({userId, dispatch});
  }, [dispatch, userId]);

  if (loading && data.length < 1) {
    return <LoadingIndicator />;
  }

  return (
    <BasicContainer>
      <PostList
        {...{data}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item?.id)}
        renderItem={({item: {title, body, id}}) => (
          <PostCard {...{title, body}} onPress={goToPost({navigation, id})} />
        )}
        ListEmptyComponent={EmptyState}
        ListHeaderComponent={() => error && <ErrorText text="Error" />}
      />
    </BasicContainer>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
