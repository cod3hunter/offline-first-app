import {useReducer} from 'react';

const formReducer = (state, action) => {
  return state.map((stateItem) => {
    if (action.name === 'initialValues') {
      return {
        ...stateItem,
        value: action.value[stateItem.name],
      };
    }
    if (stateItem.name === action.name) {
      return {
        ...stateItem,
        value: action.value,
      };
    }
    return stateItem;
  });
};
const useForm = (initialState) => {
  return useReducer(formReducer, initialState);
};

export default useForm;
