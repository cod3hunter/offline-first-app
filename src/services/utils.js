export const normalizeFormData = (entryData) => {
  return entryData.reduce(
    (normalizedObj, data) => ({
      ...normalizedObj,
      [data.name]: data.value,
    }),
    {},
  );
};

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
