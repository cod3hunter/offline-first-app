import {requestValidateUser} from '../../store/ducks/UserDuck';

export const validateAccess = ({userId, dispatch}) => {
  dispatch(requestValidateUser({id: userId}));
};
