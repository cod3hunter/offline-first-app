import {createRef} from 'react';

export const navigationRef = createRef();

export const goBack = () => {
  navigationRef.current?.goBack();
};
