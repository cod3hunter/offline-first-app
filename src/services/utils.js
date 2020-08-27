import * as NavigationService from './NavigationService';

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

export const generateId = () => Math.floor(1000 + Math.random() * 9000) * -1;

export const handleMetaNavigation = (meta) => {
  if (!meta?.navigation?.method || meta?.queued) {
    return;
  }
  const {method, params} = meta.navigation;
  NavigationService[method]?.(params);
};

export const getOfflineMeta = ({navigationMethod, navigationParams, retry}) => {
  const meta = {
    retry: retry === false ? false : true,
    queued: false,
  };
  if (navigationMethod) {
    meta.navigation = {
      method: navigationMethod,
      params: navigationParams,
    };
  }
  return meta;
};

export const sortByTitle = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};
