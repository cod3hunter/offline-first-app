import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {findPosts, goToPost} from './PostListService';
import {postListSelector} from '../../store/ducks/PostsDuck';
import {userIdSelector} from '../../store/ducks/UserDuck';
import {
  BasicContainer,
  EmptyState,
  LoadingIndicator,
  PostCard,
  ErrorText,
} from '../../library';

const PostList = ({navigation}) => {
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
      <FlatList
        contentContainerStyle={{paddingBottom: 16}}
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

PostList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PostList;
