import {requestFindPosts, requestCreatePost} from '../../store/ducks/PostsDuck';
import {normalizeFormData} from '../../services/utils';

export const findPosts = ({dispatch, userId}) => {
  dispatch(requestFindPosts({userId}));
};

export const goToPost = ({navigation, id}) => () => {
  navigation.navigate('Post', {id});
};

export const createPost = ({form, userId, navigation, dispatch}) => () => {
  const post = normalizeFormData(form);
  dispatch(requestCreatePost({...post, userId}));
  navigation.goBack();
};
