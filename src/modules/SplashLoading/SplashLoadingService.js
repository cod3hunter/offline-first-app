import {checkInternetConnection} from 'react-native-offline';
import {requestValidateUser} from '../../store/ducks/UserDuck';
import {reset} from '../../services/NavigationService';

export const validateAccess = async ({userId, dispatch}) => {
  const isConnected = await checkInternetConnection();
  if (isConnected) {
    return dispatch(requestValidateUser({id: userId}));
  }
  reset({routes: [{name: 'Posts'}], index: 0});
};
