export const formReducer = (state, action) => {
  return state.map((stateItem) => {
    if (stateItem.name === action.name) {
      return {
        ...stateItem,
        value: action.value,
      };
    }
    return stateItem;
  });
};

export const initialFormState = [
  {name: 'name', value: '', placeholder: 'Name'},
  {name: 'email', value: '', placeholder: 'E-mail'},
  {name: 'gender', value: '', placeholder: 'Gender'},
];
