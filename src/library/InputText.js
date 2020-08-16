import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  width: 100%;
  margin-top: 16px;
`;

const Input = styled.TextInput`
  background-color: white;
  border-radius: 8px;
  elevation: 2;
  width: 100%;
  font-size: 16px;
  font-family: 'Arial, Helvetica, sans-serif';
  padding: 8px;
`;

const InputText = ({placeholder, value, onChangeText}) => (
  <Container>
    <Input {...{placeholder, value, onChangeText}} numberOfLines={1} />
  </Container>
);

InputText.defaultProps = {
  placeholder: '',
};

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default InputText;
