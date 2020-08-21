import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {validateAccess} from './SplashLoadingService';
import BasicContainer from '../../library/BasicContainer';
import LoadingIndicator from '../../library/LoadingIndicator';

const SplashLoadingScreen = ({}) => {
  const userId = useSelector((state) => state.user.data?.id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      validateAccess({dispatch, userId});
    }
  }, [userId, dispatch]);
  return (
    <BasicContainer>
      <LoadingIndicator />
    </BasicContainer>
  );
};

export default SplashLoadingScreen;
