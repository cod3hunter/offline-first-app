import {requestFindUserById} from '../../store/ducks/UserDuck';

export const findUserById = ({id, dispatch}) => () => {
  dispatch(requestFindUserById({id}));
};

export const goToCreateUser = ({navigation}) => () => {
  navigation.navigate('CreateUser');
};
