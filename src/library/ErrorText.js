import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  width: 100%;
  margin-top: 24px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: red;
  font-weight: bold;
  font-size: 18px;
`;

const ErrorText = ({text}) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

ErrorText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorText;
