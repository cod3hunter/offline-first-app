import {normalizeFormData} from '../../services/utils';
import {
  requestFindPosts,
  requestCreatePost,
  requestUpdatePost,
} from '../../store/ducks/PostsDuck';

export const findPosts = ({dispatch, userId}) => {
  dispatch(requestFindPosts({userId}));
};

export const goToPost = ({navigation, id}) => () => {
  navigation.navigate('Post', {id});
};

export const createPost = ({
  form,
  userId,
  dispatch,
  setInvalidFieldValue,
}) => () => {
  const post = normalizeFormData(form);
  if (validateFields({...post, setInvalidFieldValue})) {
    dispatch(requestCreatePost({...post, userId}));
  }
};

export const initialFormState = [
  {name: 'title', placeholder: 'Title', value: ''},
  {name: 'body', placeholder: 'Description', value: ''},
];

export const updatePost = ({
  postId,
  form,
  dispatch,
  setInvalidFieldValue,
}) => () => {
  const post = normalizeFormData(form);
  if (validateFields({...post, setInvalidFieldValue})) {
    dispatch(requestUpdatePost({...post, postId}));
  }
};

export const validateFields = ({title, body, setInvalidFieldValue}) => {
  if (!title) {
    setInvalidFieldValue('O título do post é obrigatório!');
    return false;
  }
  if (!body) {
    setInvalidFieldValue('A descrição do post é obrigatória!');
    return false;
  }
  return true;
};
