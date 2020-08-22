import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import BasicContainer from '../../library/BasicContainer';
import InputText from '../../library/InputText';
import Button from '../../library/Button';
import ErrorText from '../../library/ErrorText';
import useForm from '../../hooks/useForm';
import {createPost, initialFormState, updatePost} from './PostsService';

const InputContainer = styled.View`
  width: 100%;
`;

const PostScreen = ({route}) => {
  const postId = route.params?.id;

  const [invalidFieldValue, setInvalidFieldValue] = useState();

  const dispatch = useDispatch();
  const post = useSelector((state) =>
    postId ? state.posts.data.find((item) => item.id === postId) : null,
  );
  const userId = useSelector((state) => state.user.data.id);
  const {loading, error} = useSelector((state) => state.posts);

  const [form, formDispatch] = useForm(initialFormState);

  useEffect(() => {
    if (post) {
      formDispatch({name: 'initialValues', value: post});
    }
  }, [post, formDispatch]);

  return (
    <BasicContainer>
      <InputContainer>
        {form.map((field) => (
          <InputText
            value={field.value}
            key={field.name}
            placeholder={field.placeholder}
            onChangeText={(text) =>
              formDispatch({name: field.name, value: text})
            }
          />
        ))}
      </InputContainer>
      <Button
        {...{loading}}
        text="Salvar"
        onPress={
          postId
            ? updatePost({postId, form, dispatch, setInvalidFieldValue})
            : createPost({form, userId, dispatch, setInvalidFieldValue})
        }
      />
      {invalidFieldValue && <ErrorText text={invalidFieldValue} />}
      {error && <ErrorText text="Tivemos um problema para criar o post" />}
    </BasicContainer>
  );
};

export default PostScreen;
