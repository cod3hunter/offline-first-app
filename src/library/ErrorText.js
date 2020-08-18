import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  width: 100%;
  margin-top: 8px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  border-radius: 8px;
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
