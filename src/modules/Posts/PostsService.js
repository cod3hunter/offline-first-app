import {requestFetchUsers} from '../../store/ducks/UsersDuck';

export const fillUserList = ({dispatch}) => {
  dispatch(requestFetchUsers());
};

export const goToUserScreen = ({navigation, userId}) => () => {
  navigation.navigate('User', {id: userId});
};
