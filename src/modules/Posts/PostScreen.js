import React from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import BasicContainer from '../../library/BasicContainer';
import InputText from '../../library/InputText';
import Button from '../../library/Button';
import ErrorText from '../../library/ErrorText';
import useForm from '../../hooks/useForm';
import {createPost} from './PostsService';

const InputContainer = styled.View`
  width: 100%;
`;

const initialFormState = [
  {name: 'title', placeholder: 'Title', value: ''},
  {name: 'body', placeholder: 'Description', value: ''},
];

const PostScreen = ({navigation}) => {
  const [form, formDispatch] = useForm(initialFormState);
  const userId = useSelector((state) => state.user.data.id);
  const dispatch = useDispatch();
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
        text="Salvar"
        onPress={createPost({navigation, form, userId, dispatch})}
      />
    </BasicContainer>
  );
};

export default PostScreen;
