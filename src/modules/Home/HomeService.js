import {requestFetchUsers} from '../../store/ducks/UsersDuck';

export const fillUserList = ({dispatch}) => {
  dispatch(requestFetchUsers());
};

export const createUser = ({form, dispatch}) => {
  dispatch(requestFetchUsers({form}));
};
