import React, {useReducer} from 'react';
import styled from 'styled-components/native';
import BasicContainer from '../../library/BasicContainer';
import InputText from '../../library/InputText';
import SubmitButton from '../../library/SubmitButton';
import {formReducer, initialFormState} from './UserSevice';

const InputContainer = styled.View`
  width: 100%;
`;

const UserScreen = () => {
  const [form, formDispatch] = useReducer(formReducer, initialFormState);
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
      <SubmitButton text="Salvar" onPress={() => console.log('save')} />
    </BasicContainer>
  );
};

export default UserScreen;
