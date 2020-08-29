import {requestFindPosts} from '../../store/ducks/PostsDuck';

export const findPosts = ({dispatch, userId}) => {
  if (!userId) {
    return;
  }
  dispatch(requestFindPosts({userId}));
};

export const goToPost = ({navigation, id}) => () => {
  navigation.navigate('Post', {id});
};
