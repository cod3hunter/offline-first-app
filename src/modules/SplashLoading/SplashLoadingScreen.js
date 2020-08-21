import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {} from './SplashLoadingService';
import BasicContainer from '../../library/BasicContainer';
import LoadingIndicator from '../../library/LoadingIndicator';

const SplashLoadingScreen = ({}) => {
  const userId = useSelector((state) => state.user.data?.id);
  useEffect(() => {
    if (userId) {
      console.log(userId);
    }
  }, [userId]);
  return (
    <BasicContainer>
      <LoadingIndicator />
    </BasicContainer>
  );
};

export default SplashLoadingScreen;
