import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {goToCreateUser, findUserById} from './AccessService';
import BasicContainer from '../../library/BasicContainer';
import InputText from '../../library/InputText';
import Button from '../../library/Button';

const InputContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const AccessScreen = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  return (
    <BasicContainer>
      <InputContainer>
        <InputText
          placeholder="Insira o ID do usuário"
          value={userId}
          onChangeText={setUserId}
        />
        <Button
          text="Ver Posts"
          onPress={findUserById({dispatch, id: userId})}
        />
        <Button text="Criar Usuário" onPress={goToCreateUser({navigation})} />
      </InputContainer>
    </BasicContainer>
  );
};

export default AccessScreen;
