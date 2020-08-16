import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {COLORS} from '../constants';

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.LIGHT};
  padding: 0 16px;
`;

const BasicContainer = ({children}) => <Container>{children}</Container>;

BasicContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicContainer;
