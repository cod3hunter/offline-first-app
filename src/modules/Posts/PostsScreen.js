import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {findPosts, goToCreatePost} from './PostsService';
import PostCard from '../../library/PostCard';
import LoadingIndicator from '../../library/LoadingIndicator';
import EmptyState from '../../library/EmptyState';
import BasicContainer from '../../library/BasicContainer';
import ErrorText from '../../library/ErrorText';

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 16,
  },
});

const HomeScreen = ({navigation}) => {
  const {data, loading, error} = useSelector((state) => state.posts);
  const userId = useSelector((state) => state.user.data.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      findPosts({userId, dispatch});
    }
  }, [dispatch, userId]);

  if (loading && data.length < 1) {
    return <LoadingIndicator />;
  }

  return (
    <BasicContainer>
      <FlatList
        {...{data}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item: {title, body}}) => (
          <PostCard {...{title, body}} onPress={goToCreatePost({navigation})} />
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
