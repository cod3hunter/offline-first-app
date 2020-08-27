import React, {useState} from 'react';
import styled from 'styled-components/native';
import {BasicContainer, InputText, Button, ErrorText} from '../../library';
import useForm from '../../hooks/useForm';
import {initialFormState, requestCreateUser} from './CreateUserSevice';

const InputContainer = styled.View`
  width: 100%;
`;

const UserScreen = ({navigation}) => {
  const [form, formDispatch] = useForm(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
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
        onPress={requestCreateUser({form, setError, setLoading, navigation})}
        loading={loading}
      />
      {error && <ErrorText text={error} />}
    </BasicContainer>
  );
};

export default UserScreen;
