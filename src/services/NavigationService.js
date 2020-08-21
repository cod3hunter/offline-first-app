import {createRef} from 'react';

export const navigationRef = createRef();

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const navigate = ({route, params}) => {
  navigationRef.current?.navigate(route, params);
};

export const reset = ({routes, index}) => {
  navigationRef.current?.reset({index, routes});
};
