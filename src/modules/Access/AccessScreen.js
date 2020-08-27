import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {goToCreateUser, findUserById} from './AccessService';
import {BasicContainer, InputText, Button, ErrorText} from '../../library';

const InputContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const AccessScreen = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const {error, loading} = useSelector((state) => state.user);
  return (
    <BasicContainer>
      <InputContainer>
        <InputText
          placeholder="Insira o ID do usuário"
          value={userId}
          onChangeText={setUserId}
        />
        {error && <ErrorText text={error} />}
        <Button
          {...{loading}}
          text="Ver Posts"
          onPress={findUserById({dispatch, id: userId})}
        />
        <Button text="Criar Usuário" onPress={goToCreateUser({navigation})} />
      </InputContainer>
    </BasicContainer>
  );
};

export default AccessScreen;
